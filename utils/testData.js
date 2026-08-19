function generateUniqueInvoiceNo() {
  const now = new Date();
  const datePart = now.toISOString().slice(0,10).replace(/-/g, ''); // 20260819
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `SI-${datePart}-${randomPart}`; // e.g. SI-20260819-4821
}

module.exports = {
  invoiceHeader: {
    scenarioId: 'SN001',
    sellerInvoiceNo: generateUniqueInvoiceNo(),
    poNo: '12345',
    doNo: '4532',
    specialDiscount: '10'
  },
  buyer: {
    businessName: 'webdna works pvt ltd',
    ntnCnic: '12345',
    address: 'the aga khan road',
    province: 'AZAD JAMMU AND KASHMIR',
    registrationType: 'Registered',
    buyerId: '1'
  },
  invoiceItem: {
    sellerItemCode: '1234',
    description: 'product',
    quantity: 10,
    salesExcTax: 12,
    taxRate: 18,
    furtherTax: 5,
    extraTax: 3,
    fedPayable: 2,
    discount: 3,
    fixedRetailPrice: 3,
    stWithheld: 2,
    sroScheduleNo: 4,
    sroItemSerial: 2,
    sroSchedule: '3rd Schedule Goods'
  }
};