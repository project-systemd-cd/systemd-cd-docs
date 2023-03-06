import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  // Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Simply",
    // Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        Build CI/CD pipelines with just one Linux server not a cluster with
        multiple machines.
      </>
    ),
  },
  {
    title: "Pull-type pipeline",
    // Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>Build an observable CI/CD system with PULL-type CI/CD pipeline.</>
    ),
  },
  {
    title: "GitOps",
    // Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        Manage your application with GitOps. You can install and uninstall
        applications simply by adding and removing manifest files in your git
        repository.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      {/* <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div> */}
      <div
        className="text--center padding-horiz--md"
        style={{ maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}
      >
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div
          className="row"
          style={{ justifyContent: "center", rowGap: "60px" }}
        >
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
