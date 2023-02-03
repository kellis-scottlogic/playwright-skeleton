import fs from 'fs';

function globalTeardown() {
  fs.unlink('../ui/storageState.json', (err: Error) => {
    if (err) {
      throw err;
    } else {
      console.log('Storage State successfully deleted');
    }
  });
  fs.unlink('../ui/auth.json', (err: Error) => {
    if (err) {
      throw err;
    } else {
      console.log('Auth.json successfully deleted');
    }
  });
}

export default globalTeardown;
