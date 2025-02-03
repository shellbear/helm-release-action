async function getLatestHelmS3Version() {
    try {
      const response = await fetch('https://api.github.com/repos/hypnoglow/helm-s3/releases/latest');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.tag_name.replace(/^v/, '');
    } catch (err) {
      throw new Error(`Failed to fetch latest helm-s3 version: ${err.message}`);
    }
  }

module.exports = { getLatestHelmS3Version };