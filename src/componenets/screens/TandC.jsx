import React, { useEffect, useState } from "react";
import "../../styles/TandC.css";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import pdf from "../../assets/policy.pdf";

const Section = ({ title, content }) => {
  return (
    <section className="custom-section">
      <h2 className="custom-title">{title}</h2>
      <div
        className="custom-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
};

const TandC = () => {
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const sectionsData = [
    {
      title: "OVERVIEW AND DEFINITIONS",
      content: `Black Fox Metaverse is an online marketplace that enables buyers of professional services (“Employers”) to search for, enter into and manage transactions with providers of professional services (“Freelancers” and, collectively with Employers, “Registered Users”). The Website contains features that enable Freelancers and Employers to do, among other things, the following:
      <br /><br />
      <strong>Employers</strong>: <br /> Create profiles, post projects, search for Freelancers, communicate with Freelancers, negotiate with Freelancers, award projects to Freelancers, manage projects, leave feedback for Freelancers, and pay Freelancers.
      <br /><br />
      <strong>Freelancers:</strong> <br /> Create profiles, advertise capabilities, submit quotes, negotiate with Employers, obtain project awards, invoice, obtain feedback from Employers, and receive payment from Employers.
      <br /><br />
      We also provide Registered Users with certain services described in, and subject to, these Terms of Service (as further defined below, the “Services”). We may add, delete or modify some or all of such Services at any time at our sole discretion with reasonable notice posted in advance on the Website. Capitalized terms used in these Terms of Service have the following meanings:
      <br /> “Account” means the account created by the Website upon registration.
      <br /> “Assumed Payment Liabilities” shall mean that portion of a Freelancer&apos;s total service charges for a Project which Black Fox Metaverse agrees to assume in consideration of the Service Charges.
      <br /><br />
      “Dispute Resolution Service” means the service described in Section 7.
      <br /> “Employer&apos;s Acceptance of Services” shall mean: <ul> <li> with respect to an Invoice, a transfer of funds by Employer to Black Fox Metaverse in respect of such Invoice or </li> <li> With respect to the Safe Deposit Service, the earlier to occur of the following: </li> <ul> <li> Employer and the Freelancer agree as to the rightful recipient of the funds or </li> <li> Employer and Freelancer have concluded the process comprising the Dispute Resolution Service. </li> </ul> </ul>
      “Black Fox Metaverse Billing and Payment Services” means, collectively, the Black Fox Metaverse Invoice Service and the Safe Deposit Service.
      <br /> Black Fox Metaverse Invoice Service” means the service described in Section 5(A).
      <br /> “Safe Deposit Service” means the service described in Section 5(B).
      <br /> “Service Charges” means, as applicable, the Project Fee, Employer Payment Processing Fee, Freelancer Transfer Method Fee and the Dispute Resolution Service Fee.
      <br /> “Services” means, collectively, the Black Fox Metaverse Billing and Payment Service, the Dispute Resolution Service and other services offered through the site.
      <br /> “Website” means the world wide web site operated by Black Fox Metaverse at www.Black Fox Metaverse.com or any replacement URL.`,
    },
    {
      title: "REGISTRATION",
      content: `<strong>A. Eligibility</strong> <br /> To access our Services through our Website, you must be a legal entity, or an individual of eighteen (18) years of age or older who can form legally binding contracts. To become a Registered User, you must accept all of the terms and conditions in, incorporated by reference in, and linked to, these Terms of Service. By becoming a Registered User, you agree to: (1) abide by the Terms of Service and the processes, procedures, and guidelines described throughout the Website; (2) be financially responsible for your use of the Website and the purchase or delivery of services; and (3) perform your obligations as specified by any Project Agreement that you accept, unless such obligations are prohibited by law or by the Terms of Service. Black Fox Metaverse reserves the right, in its sole discretion, to refuse, suspend, or terminate Services to anyone.
      <br /><br />
      <strong>B. Registration</strong> <br /> To become a Registered User and to access Services you must register for an Account. You agree to provide true, accurate and complete information as prompted by the registration form and all forms you access on the Website, and to update this information to maintain its truthfulness, accuracy and completeness.
      <br /><br />
      <strong>C. Accounts & Profiles</strong> <ul> <li>General </li> <li> Once you have registered with the Website as a Registered User, the Website will create your Account with Black Fox Metaverse.com and associate it with an account number. </li> <li>Username & Password </li> <li> During registration, you will be asked to choose a username and password for the Account. As a Registered User, you agree and you are entirely responsible to safeguard and maintain the confidentiality of the username and password you use to access this Website. You authorize Black Fox Metaverse to assume that any person using the Website with your username and password is you or is authorized to act for you. You agree to notify us immediately if you suspect any unauthorized use of the Account. </li> <li>Freelancers </li> <li> As described on the Website, a Freelancer uses proposals to submit quotes for Projects. If a Freelancer requires additional proposals in a given month, the Freelancer has the option to buy additional proposals by purchasing a Proposal Pack as described on the Website. We reserve the right to change membership fees, the monthly of proposals included in the membership options or the price Proposal Packs or institute new fees at any time, at the sole discretion of Black Fox Metaverse and upon reasonable notice posted in advance on the Website. No refunds of membership fees already paid will be given. If we exercise our right to cancel a membership as provided under these Terms of Service, at any time, we will not refund the membership fee already paid. </li> </ul>`,
    },
    {
      title: "RELATIONSHIPS",
      content: `<strong>A. Employer and Freelancer</strong> <br /> <ul> <li> <strong>Project Agreement</strong> </li> </ul> The engagement, contracting and management of a project are between an Employer and a Freelancer. Upon acceptance of a quote, the Employer agrees to purchase, and the Freelancer agrees to deliver, the services and related deliverables in accordance with the following agreements: (a) the agreement between Employer and Freelancer including the Project Proposal, Project Description, and other terms and conditions as communicated between Employer and Freelancer on the Website or otherwise, (b) these Terms of Service, and (c) any other content uploaded to the Website by either party (collectively, the “Project Agreement”). You agree not to enter into any contractual provisions in conflict with these Terms of Service. Any provision of a Project Agreement in conflict with these Terms of Service is void. Employer is responsible for managing, inspecting, accepting and paying for satisfactory services and deliverables in accordance with the Project Agreement in a timely manner. Freelancer is responsible for the performance and quality of the services in accordance with the Project Agreement in a timely manner. Employer and Freelancer each covenants and agrees to act with good faith and fair dealing in performance of the Project Agreement. <br /> <ul> <li> <strong>Independence</strong> </li> </ul> Employer and Freelancer each acknowledges and agrees that their relationship is that of independent contractors. The Freelancer shall perform services as an independent contractor and nothing in these Terms of Service shall be deemed to create a partnership, joint venture, agency, or employer-employee relationship between Freelancer and Employer or between Black Fox Metaverse and any Employer or Freelancer.You acknowledge, agree, and understand that Black Fox Metaverse does not, in any way, supervise, direct, control, or evaluate Freelancers or their work and is not responsible for any Project, Project terms or Work Product. <br /> <ul> <li> <strong>Work Product</strong> </li> </ul> Freelancer is expected to deliver the Work Product (deliverable or outcome) of the Project Agreement using Black Fox Metaverse to the Employer unless a NDA is signed between Freelancer & Employer. Black Fox Metaverse can request proof of work performed at any point of time for verfication as per Project Agreement.`,
    },
    {
      title: "Black Fox Metaverse FEES",
      content: `<strong>A. Service Fees</strong> <br /> Black Fox Metaverse deducts one or more of the following fees, as applicable, from payments made by Employers to Freelancers using the Black Fox Metaverse Billing and Payment Services: <br /> <ul> <li> <strong>Project Fee</strong> </li> </ul> Black Fox Metaverse charges all Freelancers a Project Fee. The fee is based on a Freelancer&apos;s profile membership type and is deducted from the total amount paid by an Employer for a Project. Freelancer&apos;s are charged a 3% to 10% Project Fee. <ul> <li> <strong>Employer Payment Processing Fee</strong> </li> </ul> If an Employer pays a Freelancer, an Employer Payment Processing Fee depending on the mode of payment will be charged to the Freelancer. <ul> <li> <strong>Freelancer Transfer Method Fee</strong> </li> </ul> If, upon a Freelancer&apos;s request, funds are to be disbursed via check or an NEFT transfer or through Paypal a Freelancer Transfer Method Fee will be charged to the Freelancer as described on the Website. <ul> <li> <strong>Dispute Resolution Service Fee</strong> </li> </ul> For use of Dispute Resolution Service, irrespective of the nature of resolution and any resulting disbursements, Black Fox Metaverse charges a Dispute Resolution Service Fee, equal to Rs 500 or 5% (whichever is greater) of the total amount paid by an Employer to Black Fox Metaverse for the applicable project to which such payment relates. <br /> <br /> We reserve the right to change membership fees, service fees, processing fees or any other fee that may be charged by Black Fox Metaverse at any time, at the sole discretion of Black Fox Metaverse and upon reasonable notice posted in advance on the Website. No refunds of fees already paid will be given. If we exercise our right to cancel a membership as provided under these Terms of Service, at any time, we will not refund the membership fee already paid.`,
    },
  ];

  return (
    <main className="main-container">
      <div className="content-container">
        <Document
          file={pdf}
          className={"content-container"}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
          }}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={width > 768 ? 1.7 : 0.6}
              renderMode="canvas"
              renderTextLayer={false}
            />
          ))}
        </Document>
        {/* <section className="custom-section">
          <h1 className="main-title">Terms and Conditions.</h1>
          <p className="main-paragraph">
            Welcome to Black Fox Metaverse Before using our logo design service,
            please carefully review the following Privacy Policy, as they govern
            the contractual relationship between you (the &rdquo;Client&rdquo;)
            and Black Fox Metaverse (the &rdquo;Service Provider&rdquo;). By
            using our logo design service, you acknowledge that you have read,
            understood, and agreed to these Privacy Policy in their entirety.
          </p>
        </section>
        {sectionsData.map((section) => (
          <Section
            key={section.title}
            title={section.title}
            content={section.content}
          />
        ))} */}
      </div>
    </main>
  );
};

export default TandC;
