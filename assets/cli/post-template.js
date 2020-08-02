module.exports = (answers) => {
  return `---
title: ${answers.title}
description: >-
  ${answers.description}
image: ${answers.imageUrl}
tags:
  ${answers.tags
    .split(/[\s,]+/)
    .map((tag) => {
      return `- ${tag}`;
    })
    .join('\n  ')}
---`;
};
