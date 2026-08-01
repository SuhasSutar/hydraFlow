import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateId } from './generateId.js';

const prisma = new PrismaClient();

const seedData = async () => {
  try {
    console.log('🗑️  Clearing existing MongoDB records...');
    // Delete in reverse order of dependencies
    await prisma.inventoryStock.deleteMany({});
    await prisma.fieldInventory.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.sale.deleteMany({});
    await prisma.installationChecklist.deleteMany({});
    await prisma.installation.deleteMany({});
    await prisma.warrantyClaim.deleteMany({});
    await prisma.warranty.deleteMany({});
    await prisma.aMCContract.deleteMany({});
    await prisma.serviceTicketPart.deleteMany({});
    await prisma.serviceTicketPhoto.deleteMany({});
    await prisma.serviceTicketTimeline.deleteMany({});
    await prisma.serviceTicket.deleteMany({});
    await prisma.ioTAlert.deleteMany({});
    await prisma.ioTDevice.deleteMany({});
    await prisma.telemetryData.deleteMany({});
    await prisma.ioTAlertRule.deleteMany({});
    await prisma.notification.deleteMany({});
    await prisma.auditLog.deleteMany({});
    await prisma.pumpUnit.deleteMany({});
    await prisma.productModel.deleteMany({});
    await prisma.productCategory.deleteMany({});
    await prisma.customerProfile.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.company.deleteMany({});

    console.log('🏢 Creating companies...');
    const mfgCompany = await prisma.company.create({
      data: {
        name: 'HydraFlow Manufacturing Ltd.',
        type: 'MANUFACTURER',
        registrationNumber: 'MFG123456789',
        addressLine1: 'Industrial Zone Phase 3',
        addressLine2: 'Factory Road',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411018',
        phone: '+91 20 555 0199',
        email: 'operations@hydraflow.com',
        status: 'ACTIVE',
        subscriptionPlan: 'ENTERPRISE',
      },
    });

    const dlrCompany = await prisma.company.create({
      data: {
        name: 'Apex Water Solutions & Dealers',
        type: 'DEALER',
        registrationNumber: 'DLR987654321',
        addressLine1: 'Shop 12, Metro Plaza',
        addressLine2: 'Commercial Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: '+91 22 555 0244',
        email: 'sales@apexwater.com',
        status: 'ACTIVE',
        subscriptionPlan: 'PROFESSIONAL',
      },
    });

    console.log('🔑 Hashing password123 for default accounts...');
    const passwordHash = await bcrypt.hash('password123', 12);

    console.log('👤 Creating platform users...');
    const superAdmin = await prisma.user.create({
      data: {
        email: 'superadmin@hydraflow.com',
        passwordHash,
        firstName: 'Rajesh',
        lastName: 'Sharma',
        phone: '+91 99999 11111',
        role: 'SUPER_ADMIN',
        isVerified: true,
      },
    });

    const admin = await prisma.user.create({
      data: {
        email: 'admin@hydraflow.com',
        passwordHash,
        firstName: 'Amit',
        lastName: 'Patel',
        phone: '+91 99999 22222',
        role: 'ADMIN',
        isVerified: true,
      },
    });

    const manufacturerUser = await prisma.user.create({
      data: {
        email: 'manufacturer@hydraflow.com',
        passwordHash,
        firstName: 'Vikram',
        lastName: 'Rao',
        phone: '+91 99999 33333',
        role: 'MANUFACTURER_USER',
        companyId: mfgCompany.id,
        isVerified: true,
      },
    });

    const dealerUser = await prisma.user.create({
      data: {
        email: 'dealer@hydraflow.com',
        passwordHash,
        firstName: 'Sanjay',
        lastName: 'Mehta',
        phone: '+91 99999 44444',
        role: 'DEALER_USER',
        companyId: dlrCompany.id,
        isVerified: true,
      },
    });

    const engineer = await prisma.user.create({
      data: {
        email: 'engineer@hydraflow.com',
        passwordHash,
        firstName: 'Rahul',
        lastName: 'Kumar',
        phone: '+91 99999 55555',
        role: 'SERVICE_ENGINEER',
        companyId: dlrCompany.id,
        isVerified: true,
      },
    });

    const customer = await prisma.user.create({
      data: {
        email: 'customer@hydraflow.com',
        passwordHash,
        firstName: 'Suhas',
        lastName: 'Rao',
        phone: '+91 99999 66666',
        role: 'CUSTOMER',
        isVerified: true,
      },
    });

    // Create 1:1 customer profile
    await prisma.customerProfile.create({
      data: {
        id: customer.id,
        addressLine1: 'Flat 402, Green Acres Apartment',
        addressLine2: 'Road No. 4, Baner',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411045',
        latitude: 18.5596,
        longitude: 73.7922,
        preferredContactTime: 'Evening (4 PM - 7 PM)',
        registeredByDealerId: dlrCompany.id,
      },
    });

    console.log('📁 Creating product categories...');
    const submersibleCat = await prisma.productCategory.create({
      data: {
        name: 'Submersible Pumps',
        description: 'Pumps designed to be completely submerged in water, ideal for borewells.',
      },
    });

    const centrifugalCat = await prisma.productCategory.create({
      data: {
        name: 'Centrifugal Pumps',
        description: 'Surface pumps using centrifugal force to move water, ideal for agriculture.',
      },
    });

    console.log('🛠️  Creating product models...');
    const model1 = await prisma.productModel.create({
      data: {
        manufacturerId: mfgCompany.id,
        categoryId: submersibleCat.id,
        modelName: 'AquaForce 500X',
        modelNumber: 'HF-AF-500X',
        description: 'Heavy duty 5 HP submersible pump with anti-dry run sensors.',
        powerHp: 5,
        voltage: 415,
        phase: 'THREE',
        flowRateLpm: 120,
        headM: 80,
        inletSize: '2.5 inch',
        outletSize: '2 inch',
        material: 'Stainless Steel 304',
        weight: 35,
        mrp: 45000,
        dealerPrice: 32000,
        warrantyMonths: 18,
        isIoTEnabled: true,
        images: JSON.stringify(['https://placehold.co/600x400/0f52ba/ffffff?text=AquaForce+500X']),
        status: 'ACTIVE',
      },
    });

    const model2 = await prisma.productModel.create({
      data: {
        manufacturerId: mfgCompany.id,
        categoryId: submersibleCat.id,
        modelName: 'AquaForce 1000X',
        modelNumber: 'HF-AF-1000X',
        description: 'High pressure 10 HP industrial submersible pump with IoT telemetry gateway.',
        powerHp: 10,
        voltage: 415,
        phase: 'THREE',
        flowRateLpm: 250,
        headM: 120,
        inletSize: '3 inch',
        outletSize: '2.5 inch',
        material: 'Stainless Steel 316',
        weight: 55,
        mrp: 85000,
        dealerPrice: 62000,
        warrantyMonths: 24,
        isIoTEnabled: true,
        images: JSON.stringify(['https://placehold.co/600x400/0f52ba/ffffff?text=AquaForce+1000X']),
        status: 'ACTIVE',
      },
    });

    const model3 = await prisma.productModel.create({
      data: {
        manufacturerId: mfgCompany.id,
        categoryId: centrifugalCat.id,
        modelName: 'CentraFlow 150',
        modelNumber: 'HF-CF-150',
        description: '1.5 HP centrifugal monoblock pump for domestic water supply.',
        powerHp: 1.5,
        voltage: 220,
        phase: 'SINGLE',
        flowRateLpm: 60,
        headM: 25,
        inletSize: '1 inch',
        outletSize: '1 inch',
        material: 'Cast Iron',
        weight: 18,
        mrp: 12000,
        dealerPrice: 8500,
        warrantyMonths: 12,
        isIoTEnabled: false,
        images: JSON.stringify(['https://placehold.co/600x400/545f72/ffffff?text=CentraFlow+150']),
        status: 'ACTIVE',
      },
    });

    console.log('📦 Creating pump units (serialized)...');
    const pump1 = await prisma.pumpUnit.create({
      data: {
        modelId: model1.id,
        serialNumber: generateId('PMP'),
        manufacturingDate: new Date('2026-05-15'),
        batchNumber: 'B-2026-05',
        qrCode: 'QR-' + generateId('PMP'),
        iotDeviceId: 'IOT-DEV-500X-001',
        currentOwnerId: null,
        currentDealerId: dlrCompany.id,
        status: 'AT_DEALER',
      },
    });

    const pump2 = await prisma.pumpUnit.create({
      data: {
        modelId: model2.id,
        serialNumber: generateId('PMP'),
        manufacturingDate: new Date('2026-06-01'),
        batchNumber: 'B-2026-06',
        qrCode: 'QR-' + generateId('PMP'),
        iotDeviceId: 'IOT-DEV-1000X-001',
        currentOwnerId: null,
        currentDealerId: dlrCompany.id,
        status: 'AT_DEALER',
      },
    });

    console.log('📈 Initializing inventory stock levels...');
    await prisma.inventoryStock.createMany({
      data: [
        {
          companyId: dlrCompany.id,
          modelId: model1.id,
          quantityOnHand: 15,
          quantityReserved: 2,
          reorderLevel: 5,
          warehouseLocation: 'Section A, Shelf 3',
          lastRestockedAt: new Date(),
        },
        {
          companyId: dlrCompany.id,
          modelId: model2.id,
          quantityOnHand: 8,
          quantityReserved: 1,
          reorderLevel: 2,
          warehouseLocation: 'Section B, Shelf 1',
          lastRestockedAt: new Date(),
        },
        {
          companyId: dlrCompany.id,
          modelId: model3.id,
          quantityOnHand: 25,
          quantityReserved: 0,
          reorderLevel: 10,
          warehouseLocation: 'Section C, Shelf 2',
          lastRestockedAt: new Date(),
        },
      ],
    });

    console.log('🎉 Seeding successfully completed!');
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

seedData();
