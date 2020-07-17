export default (mongoose) => {
    const schema = mongoose.Schema({
        description: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            requeride: true,
        },
        category: {
            type: String,
            requeride: true,
        },
        year: {
            type: Number,
            requeride: true,
        },
        month: {
            type: Number,
            requeride: true,
        },
        day: {
            type: Number,
            requeride: true,
        },
        yearMonth: {
            type: String,
            requeride: true,
        },
        yearMonthDay: {
            type: String, requeride: true,
        }
    });

    const Transaction = mongoose.model('transaction', schema);
    return Transaction
}