# YouTube Video Summarizer

This project is a **YouTube Video Summarizer** that utilizes **Nhost**, **Bolt**, and **n8n** to automate the process of fetching YouTube video content and generating summaries. The application fetches video transcripts (if available) and uses AI-based summarization to provide a concise overview of the video.

## Features

- Fetches YouTube video transcripts using **n8n** workflows.
- Summarizes video content into a concise format using **Bolt** for automation.
- Fully automated process using **Nhost** for backend services.
- Simple to use with no coding required by the user.

## Requirements

To run this project, ensure you have the following:

- **Nhost** account for backend services.
- **Bolt** account for integration with external services (like YouTube).
- **n8n** instance for automation workflows.
- YouTube API key for fetching video transcripts.

## Installation

### Step 1: Set up Nhost
- Create an account on [Nhost](https://nhost.io/).
- Set up a new project and configure the necessary backend services.

### Step 2: Set up Bolt
- Create an account on [Bolt](https://bolt.com/).
- Connect your **YouTube API** account in Bolt to allow fetching video transcripts.

### Step 3: Install n8n
- Follow the [n8n installation guide](https://n8n.io/docs/) to set up your n8n instance.

### Step 4: Clone this Repository
Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/youtube-video-summarizer.git
cd youtube-video-summarizer
