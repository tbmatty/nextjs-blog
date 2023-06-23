// import Head from 'next/head';
// import Layout, { siteTitle } from '../components/layout';
// import utilStyles from '../styles/utils.module.css';
// import { getSortedPostsData } from '../lib/posts';
// import Link from 'next/link';
// import Date from '../components/date';

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: { allPostsData, }
//   }
// }

// export default function Home({ allPostsData }) {
//   return (
//     <Layout home>
//       <Head>
//         <title>{siteTitle}</title>
//       </Head>
//       <section className={utilStyles.headingMd}>
//         <p>Hello, I'm Matthew. I'm a software engineer.</p>
//       </section>
//       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
//         <h2 className={utilStyles.headingLg}>Blog</h2>
//         <ul className={utilStyles.list}>
//           {allPostsData.map(({ id, date, title }) => (
//             <li className={utilStyles.listItem} key={id}>
//               <Link href={`/posts/${id}`}>{title}</Link>
//               <br />
//               <small className={utilStyles.lightText}>
//                 <Date dateString={date} />
//               </small>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </Layout>
//   );
// }

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import useSWR from 'swr';
import { getSortedPostsData } from '../lib/posts';
import tableStyles from '../styles/table.module.css';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: { allPostsData },
    };
}

const fetcher = (...args) => fetch(...args).then(res => res.json())



const Table = ({ allPostsData }) => {
    
    const { data, error } = useSWR('api/leaderboard', fetcher)
 
    if (error) return <div>failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <table className={tableStyles.leaderboard}>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Referrals</th>
                    </tr>
                </thead>
                <tbody>
                    {data.leaderboard.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
};


export default Table;