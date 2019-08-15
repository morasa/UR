import {development} from '../data/db';
import mongoose from 'mongoose';

const {database, host, dialect, port} = development;
const connnectURL = `${dialect}://${host}:${port}/${database}`;

export default mongoose.connect(connnectURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})