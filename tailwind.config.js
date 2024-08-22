module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'body' : '#093545',
        'primary' : '#2BD17E',
        'secondary' : '#092C39',
        'input-bg' : '#224957'
      },
      borderRadius: {
        '2lg' : '10px'
      },
      fontSize: {
        '6xxl' : '64px'
      },
      lineHeight: {
        '20' : '80px'
      },
      padding: {
        '30' : '120px'
      },
      minHeight: {
        'fix' : 'calc(100vh - 372px)'
      },
      maxWidth: {
        '2xl' : '1200px'
      }
    },
  },
  plugins: [],
}