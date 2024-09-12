import "./App.css";
import Home from "./components/Home/Home";
import Account from "./components/Account/Account";
import Library from "./components/Library/Library";
import ChatBot from "./components/ChatBot/ChatBot";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Post from "./components/Home/Post/Post";
import AuthContext from "./Context/AuthContext";
import AuthProvider from "./Context/AuthProvider";
import Chat from "./components/Chat/Chat";
import ChatLayout from "./components/Chat/ChatLayout";
import ChatItem from "./components/Chat/ChatItem";
import { FeedProvider } from "./Context/FeedContext";
import LibraryDetails from "./components/Library/LibraryDetails";
import { ChatProvider } from "./Context/ChatContext";
import UsersPage from "./components/Users/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FeedProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/feeds" replace />} />
              <Route path="feeds" element={<Home />} />
              <Route path="account" element={<Account />} />
              <Route path="account/:id" element={<Account />} />
              <Route path="library" element={<Library />} />
              <Route path="library/details/:id" element={<LibraryDetails />} />
              <Route path="chatbot" element={<ChatBot />} />
              <Route path="chatbot/:id" element={<ChatBot />} />
              <Route path="post/:id" element={<Post />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="chat" element={<ChatLayout />}>
                <Route index element={<Chat />} />
                <Route
                  path="request/:id"
                  element={<ChatItem isMessage={false} />}
                />
                <Route
                  path="message/:id"
                  element={<ChatItem isMessage={true} />}
                />
              </Route>
            </Route>
          </Routes>
        </FeedProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
