"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
exports.CloudinaryProvider = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: 'dooibzxxg',
            api_key: '415581119926739',
            api_secret: 'XUdqprJX1_cphmz7BUzG1MRFCvg',
        });
    },
};
//# sourceMappingURL=Cloudinary.provider.js.map