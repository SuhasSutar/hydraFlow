import prisma from '../config/db.js';
import ApiResponse from '../utils/apiResponse.js';

/**
 * GET /api/products/models
 * List all product models (with optional filters)
 */
export const listProductModels = async (req, res) => {
  try {
    const { status, categoryId, search, page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};

    // Manufacturer users can only see their own company's models
    if (req.user.role === 'MANUFACTURER_USER') {
      where.manufacturerId = req.user.companyId;
    }

    if (status) where.status = status;
    if (categoryId) where.categoryId = categoryId;

    if (search) {
      where.OR = [
        { modelName: { contains: search, mode: 'insensitive' } },
        { modelNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [models, total] = await Promise.all([
      prisma.productModel.findMany({
        where,
        include: {
          category: { select: { id: true, name: true } },
          manufacturer: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.productModel.count({ where }),
    ]);

    return ApiResponse.paginated(res, models, page, limit, total);
  } catch (error) {
    console.error('❌ Error listing product models:', error);
    return ApiResponse.error(res, 'Failed to list product models');
  }
};

/**
 * GET /api/products/models/:id
 * Get a single product model by ID
 */
export const getProductModel = async (req, res) => {
  try {
    const model = await prisma.productModel.findUnique({
      where: { id: req.params.id },
      include: {
        category: { select: { id: true, name: true } },
        manufacturer: { select: { id: true, name: true } },
      },
    });

    if (!model) {
      return ApiResponse.notFound(res, 'Product model not found');
    }

    return ApiResponse.success(res, model);
  } catch (error) {
    console.error('❌ Error getting product model:', error);
    return ApiResponse.error(res, 'Failed to get product model');
  }
};

/**
 * POST /api/products/models
 * Create a new product model
 */
export const createProductModel = async (req, res) => {
  try {
    const {
      categoryId,
      modelName,
      modelNumber,
      description,
      powerHp,
      voltage,
      phase,
      flowRateLpm,
      headM,
      inletSize,
      outletSize,
      material,
      weight,
      mrp,
      dealerPrice,
      warrantyMonths,
      isIoTEnabled,
      images,
      status: productStatus,
    } = req.body;

    // Validate required fields
    if (!modelName || !modelNumber || mrp === undefined || dealerPrice === undefined) {
      return ApiResponse.badRequest(res, 'modelName, modelNumber, mrp, and dealerPrice are required');
    }

    // Determine manufacturer ID from the logged-in user's company
    const manufacturerId = req.user.companyId;
    if (!manufacturerId) {
      return ApiResponse.badRequest(res, 'User must belong to a manufacturer company');
    }

    // Resolve or create the category
    let resolvedCategoryId = categoryId;
    if (!resolvedCategoryId && req.body.categoryName) {
      // Find by name, or create a new category
      let category = await prisma.productCategory.findFirst({
        where: { name: req.body.categoryName },
      });
      if (!category) {
        category = await prisma.productCategory.create({
          data: { name: req.body.categoryName },
        });
      }
      resolvedCategoryId = category.id;
    }

    if (!resolvedCategoryId) {
      // Fall back: create a "General" category
      let defaultCat = await prisma.productCategory.findFirst({
        where: { name: 'General' },
      });
      if (!defaultCat) {
        defaultCat = await prisma.productCategory.create({
          data: { name: 'General', description: 'Default product category' },
        });
      }
      resolvedCategoryId = defaultCat.id;
    }

    const model = await prisma.productModel.create({
      data: {
        manufacturerId,
        categoryId: resolvedCategoryId,
        modelName,
        modelNumber,
        description: description || null,
        powerHp: powerHp ? parseFloat(powerHp) : null,
        voltage: voltage ? parseFloat(voltage) : null,
        phase: phase || null,
        flowRateLpm: flowRateLpm ? parseFloat(flowRateLpm) : null,
        headM: headM ? parseFloat(headM) : null,
        inletSize: inletSize || null,
        outletSize: outletSize || null,
        material: material || null,
        weight: weight ? parseFloat(weight) : null,
        mrp: parseFloat(mrp),
        dealerPrice: parseFloat(dealerPrice),
        warrantyMonths: warrantyMonths ? parseInt(warrantyMonths) : 12,
        isIoTEnabled: isIoTEnabled === true || isIoTEnabled === 'true',
        images: images || null,
        status: productStatus || 'DRAFT',
      },
      include: {
        category: { select: { id: true, name: true } },
        manufacturer: { select: { id: true, name: true } },
      },
    });

    return ApiResponse.created(res, model, 'Product model created successfully');
  } catch (error) {
    console.error('❌ Error creating product model:', error);

    if (error.code === 'P2002') {
      return ApiResponse.badRequest(res, 'A product model with this model number already exists');
    }

    return ApiResponse.error(res, 'Failed to create product model');
  }
};

/**
 * PUT /api/products/models/:id
 * Update an existing product model
 */
export const updateProductModel = async (req, res) => {
  try {
    const existing = await prisma.productModel.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      return ApiResponse.notFound(res, 'Product model not found');
    }

    // Manufacturer users can only edit their own company's models
    if (req.user.role === 'MANUFACTURER_USER' && existing.manufacturerId !== req.user.companyId) {
      return ApiResponse.forbidden(res, 'You can only edit your own company\'s models');
    }

    const data = {};
    const fields = [
      'modelName', 'modelNumber', 'description', 'inletSize', 'outletSize',
      'material', 'status',
    ];
    const floatFields = ['powerHp', 'voltage', 'flowRateLpm', 'headM', 'weight', 'mrp', 'dealerPrice'];
    const intFields = ['warrantyMonths'];

    for (const f of fields) {
      if (req.body[f] !== undefined) data[f] = req.body[f];
    }
    for (const f of floatFields) {
      if (req.body[f] !== undefined) data[f] = parseFloat(req.body[f]);
    }
    for (const f of intFields) {
      if (req.body[f] !== undefined) data[f] = parseInt(req.body[f]);
    }
    if (req.body.phase !== undefined) data.phase = req.body.phase || null;
    if (req.body.isIoTEnabled !== undefined) data.isIoTEnabled = req.body.isIoTEnabled === true || req.body.isIoTEnabled === 'true';
    if (req.body.images !== undefined) data.images = req.body.images;
    if (req.body.categoryId !== undefined) data.categoryId = req.body.categoryId;

    const model = await prisma.productModel.update({
      where: { id: req.params.id },
      data,
      include: {
        category: { select: { id: true, name: true } },
        manufacturer: { select: { id: true, name: true } },
      },
    });

    return ApiResponse.success(res, model, 'Product model updated successfully');
  } catch (error) {
    console.error('❌ Error updating product model:', error);

    if (error.code === 'P2002') {
      return ApiResponse.badRequest(res, 'A product model with this model number already exists');
    }

    return ApiResponse.error(res, 'Failed to update product model');
  }
};

/**
 * DELETE /api/products/models/:id
 * Delete a product model
 */
export const deleteProductModel = async (req, res) => {
  try {
    const existing = await prisma.productModel.findUnique({
      where: { id: req.params.id },
      include: { pumpUnits: { select: { id: true }, take: 1 } },
    });

    if (!existing) {
      return ApiResponse.notFound(res, 'Product model not found');
    }

    if (existing.pumpUnits.length > 0) {
      return ApiResponse.badRequest(res, 'Cannot delete a model that has pump units. Set status to DISCONTINUED instead.');
    }

    if (req.user.role === 'MANUFACTURER_USER' && existing.manufacturerId !== req.user.companyId) {
      return ApiResponse.forbidden(res, 'You can only delete your own company\'s models');
    }

    await prisma.productModel.delete({ where: { id: req.params.id } });

    return ApiResponse.success(res, null, 'Product model deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting product model:', error);
    return ApiResponse.error(res, 'Failed to delete product model');
  }
};

/**
 * GET /api/products/categories
 * List all product categories
 */
export const listCategories = async (req, res) => {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { models: true } },
      },
    });

    return ApiResponse.success(res, categories);
  } catch (error) {
    console.error('❌ Error listing categories:', error);
    return ApiResponse.error(res, 'Failed to list categories');
  }
};
