// import { render, screen } from "@testing-library/react";
// import '@testing-library/jest-dom';

// import { vi } from "vitest";
// import Post from "../components/posts";
// import { getDocs, collection } from "firebase/firestore";
// import { db } from "../utils/config/firebase";

// // Mock Firebase Firestore
// vi.mock("firebase/firestore", () => ({
//   getDocs: vi.fn(),
//   collection: vi.fn(),
// }));

// // Mock Components
// vi.mock("../components/likes", () => ({
//   __esModule: true,
//   default: () => <div>Mock LikeButton</div>,
// }));

// vi.mock("../components/comments", () => ({
//   __esModule: true,
//   default: () => <div>Mock CommentSection</div>,
// }));

// describe("Post Component", () => {
//   const mockPosts = [
//     {
//       id: "1",
//       AuthorId: "author1",
//       dateCreatedAt: new Date(),
//       description: "This is a mock description for post 1",
//       title: "Post 1",
//       username: "User1",
//       photo: "/path/to/photo1.jpg",
//       imageUrl: "/path/to/image1.jpg",
//       likes: [],
//       comments: [],
//     },
//     // Add more mock posts if needed
//   ];

//   beforeEach(() => {
//     (getDocs as vi.Mock).mockResolvedValue({
//       docs: mockPosts.map((post) => ({
//         id: post.id,
//         data: () => ({
//           ...post,
//           dateCreatedAt: { toDate: () => post.dateCreatedAt },
//         }),
//       })),
//     });
//   });

//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   it("should render loading state initially", () => {
//     render(<Post />);
//     expect(screen.getByText(/loading/i)).toBeInTheDocument();
//   });

//   it("should render posts after loading", async () => {
//     render(<Post />);
    
//     // Assert that posts are rendered correctly
//     expect(await screen.findByText("Post 1")).toBeInTheDocument();
//     expect(screen.getByText("This is a mock description for post 1")).toBeInTheDocument();
//     expect(screen.getByAltText("avatar")).toBeInTheDocument();
//     expect(screen.getByAltText("post-image")).toBeInTheDocument();
//   });
  
//   // Add more tests as necessary
// });
