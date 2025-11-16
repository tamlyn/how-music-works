# Repository Setup Instructions

This repository needs a one-time setup to establish the proper branch structure.

## Problem

The feature branch was created first and became the default branch. We need to create a `main` branch to enable proper PR workflows and GitHub Pages deployment.

## Solution

Follow these steps to fix the repository structure:

### Option 1: Create main branch via GitHub UI (Recommended)

1. **Go to your repository on GitHub**
2. **Click the branch dropdown** (currently shows `claude/music-science-interactive-guide-...`)
3. **Type "main"** in the search box
4. **Click "Create branch: main from claude/music-science-interactive-guide-..."**
5. **Go to Settings → General → Default branch**
6. **Change the default branch to `main`**
7. **Go to Settings → Pages**
8. **Set Source to "GitHub Actions"**

### Option 2: Create main branch via command line

If you have push access outside of Claude Code:

```bash
# Clone the repository
git clone https://github.com/tamlyn/how-music-works.git
cd how-music-works

# Create main branch from the claude branch
git checkout claude/music-science-interactive-guide-01UdRaxXfDgn2tofN4f2Gczs
git checkout -b main
git push -u origin main

# Set main as default branch in GitHub Settings → General
```

### After Creating Main Branch

1. **Create a Pull Request** from `claude/music-science-interactive-guide-...` to `main`
2. **Merge the PR** - this will trigger the GitHub Actions workflow
3. **Verify deployment** at `https://tamlyn.github.io/how-music-works/`

## Workflow Behavior

The GitHub Actions workflow now:
- ✅ **Builds on all pushes** to `main` and `claude/**` branches
- ✅ **Builds on all pull requests**
- ✅ **Can be triggered manually** via workflow_dispatch
- ✅ **Deploys to Pages ONLY** when pushing to `main` branch

This means:
- You can test builds on the feature branch
- PRs will show build status
- Only main branch pushes actually deploy to GitHub Pages

## Testing the Build

To test if the build works locally:

```bash
npm install
npm run build
npm run preview
```

Visit `http://localhost:4173` to see the production build.
