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
