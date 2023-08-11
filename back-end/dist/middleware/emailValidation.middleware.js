"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidationMiddleware = void 0;
const common_1 = require("@nestjs/common");
let EmailValidationMiddleware = exports.EmailValidationMiddleware = class EmailValidationMiddleware {
    use(req, res, next) {
        let emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
        if (emailRegex.test(req.body.email)) {
            next();
        }
        else {
            res.writeHead(400, { 'content-type': 'application/json' });
            res.write(JSON.stringify({ message: 'Bad request: Invalid Email' }));
            res.end();
            return;
        }
    }
};
exports.EmailValidationMiddleware = EmailValidationMiddleware = __decorate([
    (0, common_1.Injectable)()
], EmailValidationMiddleware);
//# sourceMappingURL=emailValidation.middleware.js.map