import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import classes from "./Layout.module.css";

type Props = {
  children?: React.ReactNode;
  pageId?: string | string[];
};

const Layout: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>CSMovies {props.pageId && `- ${props.pageId}`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={classes.main}>
        <div className={classes.navbar}>
          <Link href="/">
            <img src="/logo.png" width="200px" />
          </Link>
          <ul>
            <Link href="/">Home</Link>
            <Link href="/movies">Movies</Link>
            <a>Login/Register</a>
          </ul>
        </div>

        <div className={classes.content}>{props.children}</div>
      </div>
    </React.Fragment>
  );
};

export default Layout;