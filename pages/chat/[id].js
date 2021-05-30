import styled from "styled-components";
import Head from "next/head";

import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat With {getRecipientEmail(chat.users, user)}</title>
      </Head>

      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  //PREP the messages on the server

  //messageRes is message Response
  const messageRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  //for serverSide rendering snapshot is not suitable soo get() is used to fetch data
  const messages = messageRes.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //PREP the Chat
  const chatRes = await ref.get();
  const chat = { id: chatRes.id, ...chatRes.data() };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-wekit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
