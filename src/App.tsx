import { ConfigProvider } from "antd";
import Layout from "./layout";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "51b4fbff",
          },
        }}
      >
        <Layout />
      </ConfigProvider>
    </>
  );
}

export default App;
