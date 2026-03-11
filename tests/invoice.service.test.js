const mongoose = require('mongoose');
const InvoiceService = require('../src/modules/invoices/invoice.service');
const Invoice = require('../src/modules/invoices/invoice.model');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/recouvra_test');
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

afterEach(async () => {
    await Invoice.deleteMany();
});

describe('Invoice Service - create', () => {
    it('should create an invoice', async () => {
        const data = {
            client:  new mongoose.Types.ObjectId(),
            amount:  1500,
            dueDate: new Date('2024-12-31'),
        };
        const invoice = await InvoiceService.create(data);
        expect(invoice._id).toBeDefined();
        expect(invoice.amount).toBe(1500);
        expect(invoice.status).toBe('pending');
    });

    it('should fail without required fields', async () => {
        await expect(InvoiceService.create({})).rejects.toThrow();
    });
});

describe('Invoice Service - update', () => {
    it('should update an invoice', async () => {
        const invoice = await Invoice.create({
            client:  new mongoose.Types.ObjectId(),
            amount:  1000,
            dueDate: new Date('2024-12-31'),
        });
        const updated = await InvoiceService.update(invoice._id, { amount: 2000 });
        expect(updated.amount).toBe(2000);
    });

    it('should return null for non-existent invoice', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const updated = await InvoiceService.update(fakeId, { amount: 2000 });
        expect(updated).toBeNull();
    });
});

describe('Invoice Service - updateStatus', () => {
    it('should update invoice status to paid', async () => {
        const invoice = await Invoice.create({
            client:  new mongoose.Types.ObjectId(),
            amount:  1000,
            dueDate: new Date('2024-12-31'),
        });
        const updated = await InvoiceService.updateStatus(invoice._id, 'paid');
        expect(updated.status).toBe('paid');
    });

    it('should update invoice status to partial', async () => {
        const invoice = await Invoice.create({
            client:  new mongoose.Types.ObjectId(),
            amount:  1000,
            dueDate: new Date('2024-12-31'),
        });
        const updated = await InvoiceService.updateStatus(invoice._id, 'partial');
        expect(updated.status).toBe('partial');
    });
});