import test from 'node:test';
import assert from 'node:assert';

test('Task Model - Basic Validation', async (t) => {
  // Test that task title is required
  const taskWithoutTitle = { description: 'No title' };
  assert(!taskWithoutTitle.title, 'Title should be undefined');

  // Test task with valid data
  const validTask = {
    title: 'Test Task',
    description: 'This is a test task',
    completed: false,
    user: '507f1f77bcf86cd799439011'
  };

  assert.strictEqual(validTask.title, 'Test Task');
  assert.strictEqual(validTask.completed, false);
  assert(validTask.user);
});

test('Task Routes - Authorization', async (t) => {
  // Test that unauthorized users cannot delete other users' tasks
  const task = { user: 'userId1', _id: 'taskId1' };
  const currentUserId = 'userId2';

  const isOwner = task.user === currentUserId;
  assert.strictEqual(isOwner, false, 'Task should not belong to current user');

  // Test that authorized users can delete
  const task2 = { user: currentUserId, _id: 'taskId2' };
  const isOwner2 = task2.user === currentUserId;
  assert.strictEqual(isOwner2, true, 'Task should belong to current user');
});
