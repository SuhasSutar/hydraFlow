/**
 * Generate human-readable sequential IDs
 * Format: PREFIX-YYYY-NNNN (e.g., ORD-2026-0042)
 */
export const generateId = (prefix) => {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  const timestamp = Date.now().toString(36).slice(-4).toUpperCase();
  return `${prefix}-${year}-${timestamp}${random}`;
};

/**
 * Generate unique ticket/order numbers
 */
export const generateOrderNumber = () => generateId('ORD');
export const generateSaleNumber = () => generateId('SAL');
export const generateInstallationNumber = () => generateId('INST');
export const generateTicketNumber = () => generateId('SRV');
export const generateClaimNumber = () => generateId('CLM');
export const generateContractNumber = () => generateId('AMC');
