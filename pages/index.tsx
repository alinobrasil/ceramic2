import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

import { useCeramicContext } from '../context';
import { PostProps } from '../types';

import Head from 'next/head'

import Post from "../components/post.component"
import styles from "../styles/Home.module.scss"


const Home: NextPage = () => {
  const clients = useCeramicContext()
  const { ceramic, composeClient } = clients
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState<PostProps[] | []>([])



  const createTermsheet = async () => {
    console.log("writing termsheet....")

    const ts = await composeClient.executeQuery(`
    mutation {
      createTermSheet(input:{
        content:{
          TermsDescription: "Car financing"
          AmountUSDC: "1000"
          LoanPaidOutTo: "xyzCars.eth"
          LoanStartDate: "2023-03-20"
          LoanEndDate: "2023-09-20"
          APR: "6.23"
          RepaymentStartDate: "2023-04-20"
          RepaymentEndDate: "2023-12-20"
          DefaultDays: 90
          URL: "https://irltrust.xyz/djc8s"
        }
      })
      {
        document{
          id
          TermsDescription
        }
      }
    }
    `)

    console.log(ts)

  }


  const viewTermsheets = async () => {
    const termsheets = await composeClient.executeQuery(`
    query {
      termSheetIndex (last:100){
        edges{
          node{
            TermsDescription
            LoanStartDate
            LoanEndDate
            AmountUSDC
            APR
            URL
            DefaultDays
            RepaymentStartDate
            RepaymentEndDate
            id
            
          }
        }
      }
    }
    `)
    console.log(termsheets)
  }


  const createPost = async () => {
    if (ceramic.did !== undefined) {
      const profile = await composeClient.executeQuery(`
        query {
          viewer {
            basicProfile {
              id
            }
          }
        }
      `)
      const post = await composeClient.executeQuery(`
        mutation {
          createPosts(input: {
            content: {
              body: """${newPost}"""
              created: "${new Date().toISOString()}"
              profileId: "${profile.data.viewer.basicProfile.id}"
            }
          })
          {
            document {
              body
            }
          }
        }
      `)
      getPosts()
      setNewPost('')
    }
  }
  const getPosts = async () => {
    const following = await composeClient.executeQuery(`
      query {
        node(id: "${localStorage.getItem('viewer')}") {
          ...on CeramicAccount {
            followingList(last:300) {
              edges {
                node {
                  profile {
                    id
                    username
                    name
                    posts(last:30) {
                      edges {
                        node {
                          id
                          body
                          created
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `)
    const explore = await composeClient.executeQuery(`
      query {
        postsIndex(last:300) {
          edges {
            node {
              id
              body
              created
              profile{
                id
                name
                username
              }
            }
          }
        }
      }
    `)

    // TODO: Sort based off of "created date"
    const posts: PostProps[] = []

    if (following.data !== undefined) {
      following.data?.node?.followingList.edges.map(profile => {
        profile.node.profile.posts.edges.map(post => {
          posts.push({
            author: {
              id: profile.node.profile.id,
              name: profile.node.profile.name,
              username: profile.node.profile.username,
            },
            post: {
              id: post.node.id,
              body: post.node.body,
              created: post.node.created
            }
          })
        })
      })
    } else {
      explore.data?.postsIndex?.edges.map(post => {
        posts.push({
          author: {
            id: post.node.profile.id,
            name: post.node.profile.name,
            username: post.node.profile.username
          },
          post: {
            id: post.node.id,
            body: post.node.body,
            created: post.node.created
          }
        })
      })
    }
    posts.sort((a, b) => (new Date(b.created) - new Date(a.created)))


    setPosts((posts?.reverse())) // reverse to get most recent msgs
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <Head>
        <title>DecentraTwitter</title>
        {/* TODO: UPDATE FAVICON */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="content">
        <div className={styles.share}>
          <textarea
            value={newPost}
            maxLength={100}
            placeholder="What are you thinking about?"
            className={styles.postInput}
            onChange={(e) => {
              setNewPost(e.target.value)
            }}
          />
          <button onClick={() => { createPost() }}>
            Share
          </button>
        </div>

        <div>
          <button onClick={() => { createTermsheet() }}>
            Write Termsheet
          </button>

          <button onClick={() => { viewTermsheets() }}>
            View Termsheets
          </button>
        </div>
        <div className={styles.postContainer}>
          {(posts).map(post => (
            <Post author={post.author} post={post.post} key={post.post.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home