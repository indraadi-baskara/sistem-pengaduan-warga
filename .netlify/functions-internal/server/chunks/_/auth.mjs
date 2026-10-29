import '../nitro/nitro.mjs';
import bcrypt from 'bcryptjs';

async function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}
async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export { hashPassword as h, verifyPassword as v };
//# sourceMappingURL=auth.mjs.map
