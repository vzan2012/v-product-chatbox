# V - Product Chatbox

A sophisticated AI-powered chatbot interface designed for batch analysis of product images. Upload multiple product images and get instant AI-driven insights about quality, defects, and product characteristics.

## 🚀 Features

### Core Functionality

- **📸 Batch Image Upload** - Upload up to 4 product images simultaneously
- **🤖 AI-Powered Analysis** - Integrated with Google Gemini 3.5 Flash for intelligent image analysis
- **💬 Natural Chat Interface** - Clean, ChatGPT-style conversation flow
- **🎯 Product-Focused Insights** - Specialized in product quality, defects, and visual analysis

### Technical Features

- **⚡ Real-time Processing** - Live loading states with immediate feedback
- **📝 Markdown Responses** - Beautifully formatted AI responses
- **🎨 Responsive Design** - Optimized for desktop and mobile devices
- **🛡️ Error Handling** - Comprehensive error boundaries and user feedback

## 🛠️ Technology Stack

| Category             | Technologies                          |
| -------------------- | ------------------------------------- |
| **Frontend**         | React 19, TypeScript, Vite            |
| **Styling**          | Tailwind CSS                          |
| **AI Integration**   | LangChain.js, Google Gemini 3.5 Flash |
| **State Management** | React Hooks                           |
| **Build Tool**       | Vite                                  |
| **Package Manager**  | Bun                                   |

## 📦 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Google AI Studio API key

### Installation

1. **Clone & Setup**

```bash
git clone <repository-url>
cd v-chatbot
bun install
```

2. **Environment Configuration**

```bash
cp .env.sample .env
```

Add your API key:

```env
VITE_GOOGLE_API_KEY=your_google_ai_studio_api_key
```

3. **Launch Development Server**

```bash
bun run dev
```

## 🎯 How to Use

### Basic Workflow

1. **Upload Product Images**

   - Click the 📎 attachment button
   - Select up to 4 product images
   - Supported formats: JPG, PNG, WebP, GIF

2. **Ask Analysis Questions**

   - "Are there any visible defects?"
   - "Is this product new or used?"
   - "How many items are in this image?"
   - "Compare the quality across these images"

3. **Review AI Insights**
   - Individual analysis for each image
   - Markdown-formatted responses
   - Quality assessments and recommendations

### Example Conversation

```
👤 User: [Uploads 3 product images]
       "Check for any manufacturing defects"

🤖 V-Chatbox:
   ## Batch Analysis Results

   ### 📸 product_front.jpg
   **Assessment:** Good overall quality
   **Findings:**
   • No visible scratches or dents
   • Color consistency is excellent
   • Packaging appears intact

   ### 📸 product_side.jpg
   **Issues:**
   • Minor scratch on lower left corner
   • Slight color variation from front image
```

## 🏗️ Architecture

```
src/
├── 🗣️  components/chat/          # Chat interface
├── ⌨️  components/input/         # User input components
├── 🎨 components/ui/            # Reusable UI elements
├── ⚡ hooks/                    # State management
├── 🔌 lib/api/                 # AI integration
├── 📚 types/                   # Type definitions
└── 🎯 App.tsx                  # Application root
```

### Key Components

- **`ChatContainer`** - Main layout and orchestration
- **`BatchResults`** - Display analysis results in card format
- **`useChat`** - Manage conversation state and AI calls
- **`useImageUpload`** - Handle image processing and validation
- **`gemini.ts`** - Google Gemini API integration layer

## 🔌 API Integration

### Google Gemini 3.5 Flash

```typescript
// Multimodal analysis example
const analysis = await analyzeBatchImages(images, query);

// Text-only chat
const response = await chatWithGemini(userMessage);
```

### Supported Analysis Types

- ✅ Product defect detection
- ✅ Quality assessment
- ✅ Quantity counting
- ✅ Condition evaluation
- ✅ Comparative analysis
- ✅ Custom user queries

## 🎨 Customization

### Adding New Analysis Templates

```typescript
// In src/lib/api/gemini.ts
const createProductAnalysisPrompt = (query: string) => `
You are a product quality specialist analyzing e-commerce images.

Focus on:
• Manufacturing defects
• Packaging quality
• Visual presentation
• Consistency across product lines

User Question: "${query}"
`;
```

### Styling Modifications

- Update Tailwind classes in component files
- Modify theme tokens in `src/index.css` (Tailwind v4 config-in-CSS)
- Extend UI components in `src/components/ui/`

## 📋 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `bun run dev`     | Start development server |
| `bun run build`   | Create production build  |
| `bun run lint`    | Run code linting         |
| `bun run preview` | Preview production build |

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Author

**Deepak Guptha Sitharaman**  
_Full-Stack Developer_

- GitHub: [@vzan2012](https://github.com/vzan2012)
- Email: deepak.guptha.s@gmail.com / vzan2012@gmail.com
- Portfolio: htttp://vzan2012.github.io

## 🙏 Acknowledgments

- **Google Gemini AI** for advanced multimodal capabilities
- **LangChain.js** for seamless AI integration
- **React Team** for the incredible framework
- **Tailwind CSS** for the utility-first styling approach

## 📞 Support

- **Documentation**: Check this README and code comments
- **Issues**: Open a GitHub issue for bugs or feature requests
- **Questions**: Reach out via email or GitHub discussions

---

**V - Product Chatbox** - Transforming product analysis through AI-powered batch processing. 🚀

_Built with modern web technologies for the next generation of e-commerce workflows._
