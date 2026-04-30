import test from 'node:test';
import assert from 'node:assert';
import bcrypt from 'bcryptjs';

test('Authentication - Password Hashing', async (t) => {
  const password = 'testPassword123';
  const hashedPassword = await bcrypt.hash(password, 10);

  // Verify password was hashed
  assert.notStrictEqual(password, hashedPassword);

  // Verify hash can be compared
  const isMatch = await bcrypt.compare(password, hashedPassword);
  assert.strictEqual(isMatch, true);

  // Verify wrong password doesn't match
  const wrongMatch = await bcrypt.compare('wrongPassword', hashedPassword);
  assert.strictEqual(wrongMatch, false);
});

test('Authentication - JWT Token Generation', async (t) => {
  import('jsonwebtoken').then(({ default: jwt }) => {
    const secret = 'test-secret-key';
    const userId = '507f1f77bcf86cd799439011';
    
    const token = jwt.sign({ userId }, secret, { expiresIn: '1h' });
    assert(token);
    assert(typeof token === 'string');

    // Verify token
    const payload = jwt.verify(token, secret);
    assert.strictEqual(payload.userId, userId);
  });
});
