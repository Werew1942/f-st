import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

export default function Home() {
  const [url, setURL] = useState("https://google.com/");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    console.log("URL: " + url);
    const result = await fetch("/api/generate/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        url,
      }),
    });
    const json = await result.json();
    setLinks([
      {
        url: json.url,
        redirect: json.redirect,
      },
      ...links,
    ]);
    setLoading(false);
  };

  const handleChange = (event) => {
    setURL(event.target.value);
  };

  const handleCopy = () => {};

  return (
    <div className={styles.container}>
      <Head>
        <title>F-ST</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mt-3 p-0">
        <h2>
          F-ST <span className="badge badge-secondary">v0.1</span>
        </h2>
        <p className="lead">Generate shortened links, privately and securely</p>
        <form
          className="input-group input-group-lg mb-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="url"
            className="form-control"
            placeholder="Enter URL"
            aria-label="Enter URL"
            aria-describedby="button-addon2"
            value={url}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="submit"
              id="button-addon2"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </main>

      <section className="container p-0">
        <h2>Links</h2>
        <div className="row">
          {links.map((link) => (
            <div className="col-sm-12" key={link.url}>
              <div
                className="alert alert-dark d-flex justify-content-between align-items-center"
                role="alert"
              >
                <span className="m-0">{link.redirect}</span>
                <div className="d-flex align-items-center">
                  <Link href={link.url}>
                    <a className="alert-link mr-2">{link.url}</a>
                  </Link>
                  <button className="btn btn-secondary">Copy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
