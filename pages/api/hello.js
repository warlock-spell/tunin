// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// http://localhost:3000/api/hello run in browser
// or
// create a new terminal, run: http :3000/api/hello (make sure you have httpie installed)
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" })
}
