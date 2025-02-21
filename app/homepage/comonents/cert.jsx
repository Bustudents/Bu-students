import React from 'react';

const certifications = [
  {
    id: 1,
    name: 'Certified Management Accountant (CMA)',
    description: 'Focuses on financial management and strategic decision-making within organizations. Offered by the Institute of Management Accountants (IMA).',
    link: 'https://www.imanet.org/cma-certification/cma-certification-overview',
  },
  {
    id: 2,
    name: 'Professional in Project Management (PNP)',
    description: 'Demonstrates expertise in project management principles and practices. Offered by the Project Management Institute (PMI).',
    link: 'https://www.pmi.org/certifications/project-management-pmp',
  },
  {
    id: 3,
    name: 'Certified Public Accountant (CPA)',
    description: 'A widely recognized credential for accounting professionals, focusing on accounting and auditing. Offered by the American Institute of CPAs (AICPA).',
    link: 'https://www.aicpa.org/becomeacpa/gettingstarted.html',
  },
  {
    id: 4,
    name: 'Chartered Financial Analyst (CFA)',
    description: 'Specializes in investment analysis and portfolio management. Offered by the CFA Institute.',
    link: 'https://www.cfainstitute.org/en/programs/cfa',
  },
  {
    id: 5,
    name: 'Certified Project Manager (CPM)',
    description: 'Focuses on project management principles and processes. Offered by the International Association of Project Managers (IAPM).',
    link: 'https://www.iapm.net/en/certification/cpm/',
  },
  {
    id: 6,
    name: 'Certified ScrumMaster (CSM)',
    description: 'Specializes in Agile project management, focusing on the Scrum methodology. Offered by the Scrum Alliance.',
    link: 'https://www.scrumalliance.org/get-certified',
  },
];

const CertificationCard = ({ name, description, link }) => (
  <div

    target="_blank"
    rel="noopener noreferrer"
    className="cert-card flex flex-col justify-between w-full max-w-sm p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
  >
    <h3 className="text-2xl font-semibold text-white mb-4">{name}</h3>
    <p className="text-gray-400 mb-6">{description}</p>
    <div className="text-center">
    <a    href={link}>  <span className="text-blue-400 hover:text-blue-600 transition-colors duration-300">Learn More &rarr;</span></a>
    </div>
  </div>
);

const PostGraduationCertifications = () => (
  <section className="certifications-section py-20 ">
    <div className="container mx-auto text-center">
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {certifications.map((cert) => (
          <div key={cert.id} className="flex justify-center">
            <CertificationCard {...cert} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PostGraduationCertifications;
