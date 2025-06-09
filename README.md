

## ✅ Project: **Askit – A StackOverflow Clone**

### 🧠 Description

**Askit** is a full-stack, open-source Q\&A platform inspired by StackOverflow. It allows developers and tech enthusiasts to ask questions, post answers, upvote responses, and grow a knowledge-driven community.

Built with **Next.js** and **Appwrite**, Askit is designed for speed, developer experience, and extensibility. It’s open for anyone to learn from, contribute to, or fork and build their own version.

---

### 🚀 Tech Stack

* **Frontend:** [Next.js 15](https://nextjs.org/) (App Router)
* **Backend (BaaS):** [Appwrite](https://appwrite.io/)
* **Database:** Appwrite Database (MariaDB under the hood)
* **Authentication:** Appwrite Auth
* **Deployment:** Appwrite's new **Sites** feature (frontend hosting)
* **Styling:** Tailwind CSS + ShadCN/UI (optional)

---

### 📦 Features

* 🔐 User authentication (login, signup, session management)
* 📝 Ask questions, give answers
* ⬆️ Upvote/downvote system
* 💬 Comment on questions and answers
* 🔍 Search and tag-based filtering
* 🧾 Profile and activity pages
* ⚙️ Admin controls (optional future enhancement)
* 🌍 Fully open-source & extendable

---

### 🛠️ Getting Started

#### 1. Clone the Repo

```bash
git clone https://github.com/Ace-Aryal/Askit.git
cd askit
```

#### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

#### 3. Set Up Appwrite

* Spin up your own Appwrite instance **or** use [Appwrite Cloud](https://cloud.appwrite.io).
* Create a project and setup:

  * **Auth Provider**
  * **Database with collections** for users, questions, answers, etc.
  * Add your frontend hostname in **project settings**.

#### 4. Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-endpoint.com/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your-main-collection-id
```

#### 5. Run the Dev Server

```bash
npm run dev
```

---

### 👨‍💻 Contributing

We welcome contributions from the community! Here’s how you can help:

* 🔧 Report bugs
* ✨ Suggest features
* 🛠️ Submit PRs (with clear commit messages and descriptions)
* 🧪 Write or improve tests
* 📚 Improve documentation

> Please open an issue before starting major changes!

---

### 📂 Folder Structure

```bash
/
├── app/                  # Next.js App Router pages and layouts
├── components/           # UI components (forms, buttons, cards, etc.)
├── lib/                  # Appwrite config and utilities
├── styles/               # Tailwind / global styles
├── public/               # Static assets
└── .env.local            # Local environment variables
```

---

### 📝 License

This project is open source under the [MIT License](./LICENSE).

---

### 🌟 Credits

* Inspired by [StackOverflow](https://stackoverflow.com/)
* Powered by [Appwrite](https://appwrite.io/)
* Built with ❤️ using [Next.js](https://nextjs.org/)


