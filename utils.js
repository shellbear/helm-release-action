const { exec } = require('@actions/exec');

async function getLatestHelmS3Version() {
  let output = '';
  await exec('curl', [
    '-s',
    'https://api.github.com/repos/hypnoglow/helm-s3/releases/latest'
  ], {
    listeners: {
      stdout: (data) => {
        output += data.toString();
      }
    }
  });

  try {
    const json = JSON.parse(output);
    return json.tag_name.replace(/^v/, ''); // Remove "v" prefix if present
  } catch (err) {
    throw new Error(`Failed to fetch latest helm-s3 version: ${err.message}`);
  }
}

module.exports = { getLatestHelmS3Version };