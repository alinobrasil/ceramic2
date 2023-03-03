import { useState, useEffect } from "react"

//visual components
import '../styles/globals.scss'
import { Sidebar } from "../components/sidebar.component"
import { Footer } from '../components/footer.component';

//ceramic stuff
import { CeramicWrapper } from "../context";
import type { AppProps } from 'next/app'
import { useCeramicContext } from '../context';
import { authenticateCeramic } from '../utils';

//walletconnect stuff
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  goerli,
  mainnet, polygon
} from "wagmi/chains";

// wallet configuration
const chains = [goerli];
const YOUR_PROJECT_ID = "5f37f72f86b701ddc31e91ef39dcc291"
// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: YOUR_PROJECT_ID }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: YOUR_PROJECT_ID,
    version: "1", // or "2"
    appName: "web3Modal",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);



// decentra twitter composedb type
type Profile = {
  id?: any
  name?: string
  username?: string
  description?: string
  gender?: string
  emoji?: string
}




const MyApp = ({ Component, pageProps }: AppProps) => {
  const clients = useCeramicContext()
  const { ceramic, composeClient } = clients
  const [profile, setProfile] = useState<Profile | undefined>()

  //handle login for ceramic
  const handleLogin = async () => {
    await authenticateCeramic(ceramic, composeClient)
    await getProfile()
  }

  //get profile for ceramic
  const getProfile = async () => {
    if (ceramic.did !== undefined) {
      const profile = await composeClient.executeQuery(`
        query {
          viewer {
            id
            basicProfile {
              id
              name
              username
            }
          }
        }
      `);
      localStorage.setItem("viewer", profile?.data?.viewer?.id)

      setProfile(profile?.data?.viewer?.basicProfile)
    }
  }


  // handle CEERAMIC login on refresh. Get profile
  // fetches profile data from localstorage
  useEffect(() => {
    if (localStorage.getItem('did')) {
      handleLogin()
      getProfile()
    } else {
      handleLogin()
    }
  }, [])

  return (
    <div className="container">

      <CeramicWrapper>
        <Sidebar
          name={profile?.name}
          username={profile?.username}
          id={profile?.id} />

        <div className="body">
          <WagmiConfig client={wagmiClient}>
            <Component {...pageProps} ceramic />
          </WagmiConfig>
          <Footer />
        </div>
      </CeramicWrapper>

      <Web3Modal
        projectId={YOUR_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
    </div>
  );
}

export default MyApp