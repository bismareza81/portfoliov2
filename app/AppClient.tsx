'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { 
  ChevronRight, ChevronLeft, ExternalLink, 
  PenTool, Leaf, MousePointer2, Sparkles,
  Cloud, Star, Coffee, Globe, Shield, BarChart3, Cpu,
  Mail, Linkedin, Github, Instagram, MapPin, 
  Briefcase, GraduationCap, Heart, Anchor, Wind, Sun, Menu, X
} from 'lucide-react';

// --- 3D ANIMAL COMPONENT (Enhanced Details) ---
const ThreeAnimal = ({ type = 'chicken', size = 150 }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current as HTMLDivElement | null;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(size, size);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    
    // Materials
    const matWhite = new THREE.MeshToonMaterial({ color: 0xffffff });
    const matBlack = new THREE.MeshToonMaterial({ color: 0x1a1a1a });
    const matRed = new THREE.MeshToonMaterial({ color: 0xee2a35 });
    const matYellow = new THREE.MeshToonMaterial({ color: 0xffcc00 });
    const matPink = new THREE.MeshToonMaterial({ color: 0xffb6c1 });
    const matGrey = new THREE.MeshToonMaterial({ color: 0xcccccc });

    // Helper: Eye Creator
    const addEyes = (parent: THREE.Object3D, x: number, y: number, z: number) => {
      const eyeGeo = new THREE.SphereGeometry(0.05, 8, 8);
      const eyeL = new THREE.Mesh(eyeGeo, matBlack);
      eyeL.position.set(x, y, z);
      const eyeR = new THREE.Mesh(eyeGeo, matBlack);
      eyeR.position.set(x, y, -z);
      parent.add(eyeL, eyeR);
    };

    // Animal Logic with Enhanced Details
    if (type === 'chicken') {
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 0.4, 4, 12), matWhite);
      const comb = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 0.2), matRed);
      comb.position.set(0.1, 0.6, 0);
      const beak = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.2, 4), matYellow);
      beak.rotation.z = -Math.PI / 2;
      beak.position.set(0.5, 0.3, 0);
      addEyes(group, 0.4, 0.45, 0.15);
      group.add(body, comb, beak);
    } 
    else if (type === 'cow') {
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.8), matWhite);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.45), matWhite);
      head.position.set(0.7, 0.2, 0);
      const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 0.35), matPink);
      muzzle.position.set(0.9, 0.1, 0);
      const earL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.2, 0.05), matWhite);
      earL.position.set(0.7, 0.4, 0.25);
      const earR = earL.clone();
      earR.position.set(0.7, 0.4, -0.25);
      const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5), matBlack);
      tail.position.set(-0.6, 0, 0);
      tail.rotation.z = 0.5;
      addEyes(head, 0.2, 0.2, 0.15);
      group.add(body, head, muzzle, earL, earR, tail);
    } 
    else if (type === 'sheep') {
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.7, 12, 12), matWhite);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), matBlack);
      head.position.set(0.7, 0.2, 0);
      const earL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.05), matBlack);
      earL.position.set(0.7, 0.3, 0.25);
      const earR = earL.clone();
      earR.position.set(0.7, 0.3, -0.25);
      addEyes(head, 0.2, 0.1, 0.1);
      group.add(body, head, earL, earR);
    } 
    else if (type === 'duck') {
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 0.3, 4, 12), matWhite);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), matWhite);
      head.position.set(0.4, 0.4, 0);
      const beak = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.25), matYellow);
      beak.position.set(0.7, 0.4, 0);
      addEyes(head, 0.2, 0.1, 0.15);
      group.add(body, head, beak);
    } 
    else if (type === 'goat') {
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.7, 0.6), matWhite);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.35), matWhite);
      head.position.set(0.6, 0.3, 0);
      const hornL = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.05, 0.3), matGrey);
      hornL.position.set(0.6, 0.6, 0.1);
      hornL.rotation.z = 0.2;
      const hornR = hornL.clone();
      hornR.position.set(0.6, 0.6, -0.1);
      const beard = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.2, 4), matWhite);
      beard.position.set(0.7, 0, 0);
      addEyes(head, 0.2, 0.2, 0.12);
      group.add(body, head, hornL, hornR, beard);
    }

    scene.add(group);
    scene.add(new THREE.AmbientLight(0xffffff, 1.8));
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(5, 5, 5);
    scene.add(light);

    camera.position.z = 2.5;

    let requestID: number | null = null;
    const animate = () => {
      requestID = requestAnimationFrame(animate);
      group.rotation.y += 0.01;
      group.position.y = Math.sin(Date.now() * 0.002) * 0.1;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (requestID !== null) cancelAnimationFrame(requestID);
      if (mount && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [type, size]);

  return <div ref={mountRef} className="hover:scale-125 transition-transform duration-500 cursor-pointer drop-shadow-xl" />;
};

// --- DATA CONTENT ---
const content = {
  id: {
    nav: { home: 'Beranda', skills: 'Keahlian', works: 'Karya', exp: 'Jurnal', contact: 'Kontak' },
    hero: {
      tag: "Business Analyst// Active",
      title: "Mengubah Kompleksitas, ",
      titleHighlight: "Pada Presisi yang Bermakna",
      desc: "Sentuhan personal dalam setiap baris kode. Saya percaya data bukan sekadar angka, melainkan cerita tentang harapan yang harus diperjuangkan dengan kejujuran.",
      btn1: "Eksplorasi Karya",
      btn2: "Mari Berdiskusi"
    },
    skills: {
      title: "Narasi Keahlian",
      desc: "Kombinasi antara logika dan empati manusia.",
      items: [
        { 
          name: "Visualisasi Data", 
          cause: "Di era digital saat ini, organisasi seringkali tenggelam dalam lautan data mentah yang kompleks dan bervolume besar. Tanpa alat yang tepat, tren krusial, anomali, dan wawasan strategis tetap tersembunyi di dalam spreadsheet yang rumit, sehingga membuat pengambilan keputusan menjadi lambat dan tidak akurat.",
          effect: "Visualisasi data mengubah angka-angka abstrak tersebut menjadi grafik, bagan, dan peta interaktif yang mudah dipahami secara intuitif. Dengan merepresentasikan data secara visual, pemangku kepentingan dapat dengan cepat mengidentifikasi pola, memahami hubungan antar variabel, dan mengomunikasikan temuan kompleks secara efektif untuk mendorong tindakan nyata.",
          color: "#EE2A35",
          icon: <BarChart3 />
        },
        { 
          name: "AI/ML", 
          cause: "Banyak perusahaan saat ini masih terjebak dalam alur kerja manual yang repetitif dan memakan waktu, seperti entri data, pemrosesan dokumen, dan tugas administratif rutin lainnya. Ketergantungan pada proses manual ini tidak hanya menurunkan produktivitas, tetapi juga meningkatkan risiko kesalahan manusia (human error) yang dapat berdampak signifikan pada operasional.",
          effect: "Penerapan Artificial Intelligence (AI) dan Machine Learning (ML) menawarkan solusi melalui otomatisasi cerdas. Tidak seperti otomatisasi tradisional yang kaku, AI dan ML memungkinkan sistem untuk belajar dari data, mengenali pola, dan mengambil keputusan secara mandiri. Dengan mengintegrasikan teknologi ini, perusahaan dapat mengotomatisasi tugas-tugas kognitif yang kompleks, mempercepat alur kerja, dan memungkinkan staf manusia untuk fokus pada pekerjaan yang bernilai strategis dan kreatif.",
          color: "#009736",
          icon: <Cpu />
        },
        { 
          name: "Penceritaan Data", 
          cause: "Meskipun visualisasi data mampu menyajikan fakta secara grafis, data tersebut sering kali gagal memicu tindakan jika tidak memiliki narasi yang kuat. Banyak pemangku kepentingan merasa kesulitan untuk memahami urgensi di balik grafik yang rumit atau tabel yang dingin, sehingga wawasan berharga berakhir hanya sebagai informasi tanpa implementasi nyata.",
          effect: "Data storytelling hadir sebagai solusi dengan menggabungkan visualisasi data yang akurat dengan narasi kontekstual. Dengan menyusun data ke dalam alur cerita yang memiliki awal, konflik, dan resolusi, analis dapat menghubungkan poin-poin data dengan pengalaman manusia. Pendekatan ini tidak hanya membuat informasi lebih mudah diingat, tetapi juga mampu membujuk audiens dan mengubah angka mentah menjadi keputusan strategis yang berdampak.",
          color: "#1A1A1A",
          icon: <Shield />
        },
        { 
          name: "Analitik Bisnis", 
          cause: "Di tengah pasar yang berubah dengan cepat, banyak organisasi kesulitan untuk menyelaraskan antara kebutuhan operasional harian dengan tujuan strategis jangka panjang. Sering kali terjadi kesenjangan komunikasi antara tim teknis (IT/pengembang) dan tim bisnis, yang mengakibatkan solusi yang dibangun tidak menjawab akar permasalahan atau tidak memberikan nilai bisnis yang diharapkan.",
          effect: "Analisis Bisnis hadir sebagai jembatan strategis yang mendefinisikan masalah, peluang, dan solusi yang efektif. Seorang analis bisnis menggunakan teknik pengumpulan kebutuhan yang terstruktur, pemodelan proses, dan analisis data untuk memastikan bahwa setiap inisiatif—baik itu perubahan proses, pengembangan perangkat lunak, atau kebijakan baru—memberikan solusi yang tepat sasaran, efisien, dan memberikan nilai nyata bagi organisasi.",
          color: "#EE2A35",
          icon: <BarChart3 />
        }
      ]
    },
    projects: {
      title: "Galeri Karya",
      desc: "Setiap proyek adalah sketsa solusi untuk tantangan nyata di lapangan.",
      items: [
        { title: "Forest Weather Monicon", type: "Data Science", icon: <Leaf />, color: "#009736", url: "https://forestweathermonicon.streamlit.app/", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80", story: "Aplikasi web interaktif yang menyediakan pemantauan cuaca secara real-time." },
        { title: "GoogieChatbot", type: "Chatbot", icon: <Globe />, color: "#EE2A35", url: "https://googiechatbot.netlify.app/", image: "https://plus.unsplash.com/premium_photo-1726550550053-6e5f7190f1bf?q=80&w=800", story: "Platform percakapan berbasis AI yang intuitif dengan kapabilitas obrolan waktu nyata dan respons yang dapat disesuaikan." },
        { title: "Pocket Qur'an (ID)", type: "Al-Quran", icon: <Shield />, color: "#1A1A1A", url: "https://pocketquran.netlify.app/", image: "https://images.unsplash.com/photo-1576764402988-7143f9cca90a?q=80&w=800", story: "Al-Qur'an digital dengan teks resolusi tinggi, terjemahan multibahasa, dan audio."},
        { title: "TenderCrawler", type: "Research", icon: <BarChart3 />, color: "#009736", url: "https://n8n.data-collect.id/workflow/KWMiZDFTqG-Q2D4n7IekK", image: "https://plus.unsplash.com/premium_photo-1681010317789-68f31df3b9b0?q=80&w=800", story: "Mesin otomatisasi berperforma tinggi untuk memantau portal pengadaan sektor pemerintah dan swasta."},
        { title: "NeuralScribe", type: "Deep Learning", icon: <Cpu />, color: "#EE2A35", url: "#", image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=870", story: "Natural language processing model summarizing complex medical records into reports easily understood by patients." }
      ]
    },
    journal: {
      title: "Jurnal Perjalanan Karir",
      desc: "Rekam jejak profesional dalam membangun narasi melalui data.",
      items: [
        {
          year: "Jan 2025 - Sekarang",
          role: "Data Strategist & Lead Analyst",
          org: "Ayaskara Nisita Synergy",
          story: "Bertanggung jawab merancang peta jalan (roadmap) pemanfaatan data yang selaras dengan tujuan jangka panjang organisasi. Tugas utamanya meliputi penentuan standar tata kelola data, pemilihan infrastruktur teknologi yang tepat, serta memastikan bahwa aset data dapat diubah menjadi keunggulan kompetitif. Mereka bertindak sebagai konsultan internal yang menjembatani kebutuhan eksekutif dengan tim teknis guna menciptakan ekosistem data yang berkelanjutan dan berbasis nilai sambil mempertahankan standar etika data yang ketat.",
          tags: ["Strategi", "Analitik", "Kepemimpinan"]
        },
        {
          year: "Jan 2023 - Dec 2024",
          role: "Junior Business Analyst",
          org: "Ayaskara Nisita Synergy",
          story: "Bertanggung jawab untuk membantu tim dalam mengidentifikasi kebutuhan bisnis, mengumpulkan data, dan memvalidasi proses operasional. Tugas utamanya meliputi mendokumentasikan alur kerja saat ini (as-is processes), membantu dalam pembuatan laporan analisis, dan memastikan komunikasi yang lancar antara departemen teknis dan operasional. Peran ini menuntut kemampuan analitis yang kuat untuk mendukung pengambilan keputusan berbasis data serta ketelitian dalam mengelola dokumentasi proyek guna memastikan efisiensi alur kerja perusahaan.",
          tags: ["KoboCollect", "Tableau", "Optimization"]
        },
        {
          year: "Mar 2021 - Dec 2022",
          role: "Asisten Ketua Tim / Tenaga Ahli Manajemen",
          org: "PT Sucofindo",
          story: "Bertanggung jawab untuk memberikan dukungan strategis dan administratif dalam pengelolaan proyek atau organisasi. Peran ini mencakup koordinasi antar divisi, penyusunan rencana kerja, serta pemantauan implementasi kebijakan guna memastikan seluruh target tim tercapai tepat waktu.",
          tags: ["Survei", "Penjadwalan Waktu", "Reporting"]
        },
        {
          year: "Jul 2020 - Feb 2021",
          role: "Front End Developer",
          org: "PT TEMAS Tbk",
          story: "Bertanggung jawab untuk membangun dan memelihara antarmuka pengguna (user interface) yang intuitif untuk sistem logistik yang kompleks. Tugas utamanya meliputi pengembangan dasbor pelacakan kapal secara real-time, sistem pemesanan kontainer, dan platform dokumentasi digital yang responsif.",
          tags: ["NextJS", "Compliance", "Figma Mockup"]
        },
        {
          year: "Jun 2019 - Jun 2020",
          role: "Support PMO & Data Surveyor",
          org: "PT Sucofindo",
          story: "Memastikan integritas data dalam proyek skala nasional. Melakukan survei kualitas data secara berkala dan menyusun laporan standarisasi operasional untuk menjamin kepatuhan terhadap regulasi industri.",
          tags: ["Survei", "Compliance", "Precision"]
        },
        {
          year: "Jan 2019 - Jun 2019",
          role: "Kredit & UMKM Staff Data Entri",
          org: "Bank Cimb Niaga",
          story: "Bertanggung jawab untuk mengelola dan memasukkan informasi krusial terkait pengajuan kredit nasabah, khususnya pada sektor UMKM, ke dalam sistem perbankan. Tugas utamanya mencakup verifikasi kelengkapan dokumen persyaratan, pencatatan profil keuangan calon debitur, serta pemeliharaan basis data agar tetap akurat dan mutakhir.",
          tags: ["Data Entri", "Akurasi Mengetik", "Analisis Spreadsheet Dasar"]
        }
      ],
      edu: [
        {
          year: "2014 - 2018",
          degree: "Sarjana Sains",
          univ: "Institut Pertanian Bogor",
          desc: "Fokus pada meteorologi terapan dan metodologi riset kuantitatif. Lulus dengan predikat sangat memuaskan."
        }
      ]
    },
    contact: {
      title: "Jalin Koneksi",
      desc: "Mari berkolaborasi untuk menciptakan dampak yang bermakna.",
      info: "Saya selalu terbuka untuk diskusi mengenai data, teknologi, and kemanusiaan. Jangan ragu untuk menyapa!",
      links: [
        { label: "Email", val: "bismareza@outlook.com", icon: <Mail />, url: "mailto:bismareza@outlook.com" },
        { label: "LinkedIn", val: "linkedin.com/in/bismareza81", icon: <Linkedin />, url: "https://www.linkedin.com/in/bismareza81" },
        { label: "GitHub", val: "github.com/bismareza81", icon: <Github />, url: "https://www.github.com/bismareza81" },
        { label: "Instagram", val: "@bismareza_", icon: <Instagram />, url: "https://www.instagram.com/bismareza_" }
      ],
      loc: "Greater Jakarta Area, Indonesia"
    }
  },
  en: {
    nav: { home: 'Home', skills: 'Skills', works: 'Works', exp: 'Journal', contact: 'Contact' },
    hero: {
      tag: "Business Analyst// Active",
      title: "Turning Raw Complexity, ",
      titleHighlight: "into Tactical Precision",
      desc: "A personal touch in every line of code. I believe data isn't just numbers, but stories of hope that must be defended with honesty.",
      btn1: "Explore Works",
      btn2: "Let's Talk"
    },
    skills: {
      title: "Skill Narratives",
      desc: "A combination of logic and human empathy.",
      items: [
        { 
          name: "Data Visualization", 
          cause: "In today's digital era, organizations are often overwhelmed by vast amounts of complex raw data. Without the right tools, crucial trends, anomalies, and strategic insights remain buried within dense spreadsheets, leading to slow and inaccurate decision-making processes.",
          effect: "Data visualization transforms these abstract numbers into intuitive graphs, charts, and interactive maps. By representing data visually, stakeholders can quickly identify patterns, understand relationships between variables, and effectively communicate complex findings to drive informed, decisive action.",
          color: "#EE2A35",
          icon: <BarChart3 />
        },
        { 
          name: "AI/ML", 
          cause: "Many organizations today remain bogged down by repetitive, time-consuming manual workflows, such as data entry, document processing, and other routine administrative tasks. Relying on these manual processes not only hampers productivity but also increases the risk of human error, which can have significant consequences for business operations.",
          effect: "The implementation of Artificial Intelligence (AI) and Machine Learning (ML) offers a solution through intelligent automation. Unlike traditional, rigid automation, AI and ML empower systems to learn from data, recognize patterns, and make decisions autonomously. By integrating these technologies, companies can automate complex cognitive tasks, accelerate workflows, and allow human staff to focus on higher-value strategic and creative initiatives.",
          color: "#009736",
          icon: <Cpu />
        },
        { 
          name: "Data Storytelling", 
          cause: "While data visualization can present facts graphically, data often fails to inspire action if it lacks a compelling narrative. Many stakeholders struggle to grasp the urgency behind complex charts or cold tables, causing valuable insights to end up as mere information rather than actionable intelligence.",
          effect: "Data storytelling provides the solution by merging accurate data visualization with contextual narrative. By framing data within a story structure—complete with a beginning, a conflict, and a resolution—analysts can connect data points to the human experience. This approach not only makes information more memorable but also persuades audiences and transforms raw numbers into impactful strategic decisions.",
          color: "#1A1A1A",
          icon: <Shield />
        },
        { 
          name: "Business Analytics", 
          cause: "In an rapidly evolving market, many organizations struggle to align day-to-day operational needs with long-term strategic goals. A recurring gap often emerges between technical teams and business stakeholders, resulting in solutions that fail to address the root cause of problems or deliver the expected business value.",
          effect: "Business Analytics serves as a strategic bridge that defines problems, opportunities, and effective solutions. A business analyst leverages structured requirements gathering, process modeling, and data analysis to ensure that every initiative—whether it is a process improvement, software development, or a new policy—delivers a targeted, efficient solution that provides tangible value to the organization.",
          color: "#EE2A35",
          icon: <BarChart3 />
        }
      ]
    },
    projects: {
      title: "Works Gallery",
      desc: "Each project is a sketch of solutions for real-world challenges.",
      items: [
        { title: "Forest Weather Monicon", type: "Data Science", icon: <Leaf />, color: "#009736", url: "https://forestweathermonicon.streamlit.app/", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80", story: "Real-time Interactive web application providing weather monitoring." },
        { title: "GoogieChatbot", type: "Chatbot", icon: <Globe />, color: "#EE2A35", url: "https://googiechatbot.netlify.app/", image: "https://plus.unsplash.com/premium_photo-1726550550053-6e5f7190f1bf?q=80&w=800", story: "Intuitive AI-powered conversational platform featuring real-time chat capabilities and custom responses." },
        { title: "Pocket Qur'an (ID)", type: "Al-Quran", icon: <Shield />, color: "#1A1A1A", url: "https://pocketquran.netlify.app/", image: "https://images.unsplash.com/photo-1576764402988-7143f9cca90a?q=80&w=800", story: "Digital Al-Qur'an with high-resolution text, multilingual translations, and audio." },
        { title: "TenderCrawler", type: "Research", icon: <BarChart3 />, color: "#009736", url: "https://n8n.data-collect.id/workflow/KWMiZDFTqG-Q2D4n7IekK", image: "https://plus.unsplash.com/premium_photo-1681010317789-68f31df3b9b0?q=80&w=800", story: "High-performance automation engine to monitor government and private sector procurement portals." },
        { title: "NeuralScribe", type: "Deep Learning", icon: <Cpu />, color: "#EE2A35", url: "#", image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=870", story: "Natural language processing model summarizing complex medical records into reports easily understood by patients." }
      ]
    },
    journal: {
      title: "Path Journal",
      desc: "A professional track record in building narratives through data.",
      items: [
        {
          year: "Jan 2025 - Present",
          role: "Data Strategist & Lead Analyst",
          org: "Ayaskara Nisita Synergy",
          story: "Responsible for designing a data roadmap that aligns with the organization's long-term goals. The primary duties include defining data governance standards, selecting the appropriate technological infrastructure, and ensuring that data assets are converted into a competitive advantage. I act as internal consultants bridging executive needs with technical teams to create a sustainable and value-driven data ecosystem while maintaining strict data ethics.",
          tags: ["Strategy", "Analytics", "Leadership"]
        },
        {
          year: "Jan 2023 - Dec 2024",
          role: "Junior Business Analyst",
          org: "Ayaskara Nisita Synergy",
          story: "Responsible for assisting the team in identifying business needs, gathering data, and validating operational processes. Their primary duties include documenting current workflows (as-is processes), assisting in the creation of analytical reports, and ensuring seamless communication between technical and operational departments. This role requires strong analytical skills to support data-driven decision-making, along with meticulous attention to detail in managing project documentation to ensure overall organizational efficiency.",
          tags: ["KoboCollect", "Tableau", "Optimization"]
        },
        {
          year: "Mar 2021 - Dec 2022",
          role: "Team Leader Assistant / Management Specialist",
          org: "Superintending Company of Indonesia",
          story: "Responsible for providing strategic and administrative support in the management of projects or organizations. This role encompasses cross-divisional coordination, the preparation of work plans, and monitoring policy implementation to ensure all team targets are met on schedule.",
          tags: ["Survei", "Time-Scheduling", "Reporting"]
        },
        {
          year: "Jul 2020 - Feb 2021",
          role: "Front End Developer",
          org: "TEMAS Shipping",
          story: "Responsible for building and maintaining intuitive user interfaces for complex logistics systems. Their primary duties include developing real-time vessel tracking dashboards, container booking systems, and responsive digital documentation platforms.",
          tags: ["NextJS", "Compliance", "Figma Mockup"]
        },
        {
          year: "Jun 2019 - Jun 2020",
          role: "Support PMO & Data Surveyor",
          org: "Superintending Company of Indonesia",
          story: "Ensuring data integrity in national-scale projects. Performed regular data survey and compiled operational standardization reports.",
          tags: ["Surveilance", "Compliance", "Precision"]
        },
        {
          year: "Jan 2019 - Jun 2019",
          role: "The Credit & MSME Data Entry Staff",
          org: "Cimb Niaga",
          story: "Responsible for managing and entering critical information related to loan applications, specifically within the MSME (Micro, Small, and Medium Enterprises) sector, into the banking system. Their primary duties include verifying the completeness of required documents, recording the financial profiles of prospective debtors, and maintaining the database to ensure it remains accurate and up to date.",
          tags: ["Data Entry", "Touch Typing", "Basic Spreadsheet Analysis"]
        }
      ],
      edu: [
        {
          year: "2014 - 2018",
          degree: "Bachelor of Sciences",
          univ: "IPB University",
          desc: "Focused on applied meteorology and quantitative research methodology. Graduated with honors."
        }
      ]
    },
    contact: {
      title: "Get in Touch",
      desc: "Let's collaborate to create a meaningful impact.",
      info: "Let's break the ice and don't hesitate to say hi!. I'm always open to discussions about data, tech, and humanity.",
      links: [
        { label: "Email", val: "bismareza@outlook.com", icon: <Mail />, url: "mailto:bismareza@outlook.com" },
        { label: "LinkedIn", val: "linkedin.com/in/bismareza81", icon: <Linkedin />, url: "https://linkedin.com/in/bismareza81" },
        { label: "GitHub", val: "github.com/bismareza81", icon: <Github />, url: "https://github.com/bismareza81" },
        { label: "Instagram", val: "@bismareza_", icon: <Instagram />, url: "https://instagram.com/bismareza_" }
      ],
      loc: "Jabodetabek, Indonesia"
    }
  }
};

const App = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState('id');
  const [profileIdx, setProfileIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Determine active tab from pathname
  const getActiveTabFromPath = () => {
    if (pathname === '/' || pathname === '/home') return 'home';
    if (pathname === '/skills') return 'skills';
    if (pathname === '/works') return 'works';
    if (pathname === '/journal') return 'journal';
    if (pathname === '/contact') return 'contact';
    return 'home';
  };

  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    setActiveTab(getActiveTabFromPath());
  }, [pathname]);
  
  // Memoized translation
  const t = useMemo(() => content[lang as keyof typeof content], [lang]);

  const profileOptions = [
    { type: 'image', value: 'https://lh3.googleusercontent.com/pw/AP1GczORxNQG_VFbRW6mUg2DlkMEtMO80cTL3c5uuO1EVVNUPgldlKGZrr2CbasMyrVM7KzPryIHtW1ssTEeGUSVj_gdkdfuaUj_VobxSGXJ9_BVrfpxCmwROICdJyfS6qqfxd8B4w9Lofjk5EOWUE2eN3SY', label: lang === 'id' ? 'Profile Picture' : 'Gambar Profil' },
    ];
    
  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    // Map tab names to routes
    const routeMap: { [key: string]: string } = {
      home: '/',
      skills: '/skills',
      works: '/works',
      journal: '/journal',
      contact: '/contact'
    };
    
    router.push(routeMap[tab] || '/');
  };

  return (
    <div className="min-h-screen bg-sky-50 text-[#1A1A1A] font-light selection:bg-yellow-400/30 overflow-x-hidden relative">
      {/* Dynamic Background Elements for Farm Theme */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Sunny Glow */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-200/40 rounded-full blur-[100px]" />
        <div className="absolute top-10 right-10 opacity-40 text-yellow-400">
           <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
             <Sun size={120} />
           </motion.div>
        </div>
        
        {/* Clouds */}
        <motion.div animate={{ x: [-20, 20, -20] }} transition={{ duration: 12, repeat: Infinity }} className="absolute top-40 left-[10%] text-white/80 drop-shadow-sm"><Cloud size={80} /></motion.div>
        <motion.div animate={{ x: [20, -20, 20] }} transition={{ duration: 15, repeat: Infinity }} className="absolute top-80 right-[15%] text-white/60 drop-shadow-sm"><Cloud size={100} /></motion.div>
        
        {/* Farm Animals Background - Desktop Only */}
        <div className="hidden md:block">
          {/* Duck - top left */}
          <div className="absolute top-[20%] left-[5%] opacity-20 hover:opacity-30 transition-opacity">
            <motion.div 
              animate={{ x: [-10, 10, -10] }} 
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ThreeAnimal type="duck" size={120} />
            </motion.div>
          </div>

          {/* Sheep - top right */}
          <div className="absolute top-[30%] right-[8%] opacity-20 hover:opacity-30 transition-opacity">
            <motion.div 
              animate={{ y: [-5, 5, -5] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ThreeAnimal type="sheep" size={100} />
            </motion.div>
          </div>

          {/* Cow - middle left */}
          <div className="absolute top-1/2 left-[10%] opacity-15 hover:opacity-25 transition-opacity">
            <motion.div 
              animate={{ x: [5, -5, 5] }} 
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <ThreeAnimal type="cow" size={140} />
            </motion.div>
          </div>

          {/* Goat - middle right */}
          <div className="absolute top-[55%] right-[12%] opacity-20 hover:opacity-30 transition-opacity">
            <motion.div 
              animate={{ y: [-8, 8, -8] }} 
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <ThreeAnimal type="goat" size={110} />
            </motion.div>
          </div>

          {/* Chicken - bottom area */}
          <div className="absolute bottom-[25%] left-[15%] opacity-15 hover:opacity-25 transition-opacity">
            <motion.div 
              animate={{ x: [-15, 15, -15] }} 
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <ThreeAnimal type="chicken" size={95} />
            </motion.div>
          </div>
        </div>
        
        {/* Rolling Hills (Bottom Visual) */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-green-400/20 blur-3xl rounded-t-full translate-y-16" />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;600&family=Handlee&display=swap');
        body { font-family: 'Outfit', sans-serif; background-image: radial-gradient(#bae6fd 1px, transparent 1px); background-size: 40px 40px; }
        .doodle-font { font-family: 'Handlee', cursive; }
        .sketch-border { border: 2px solid #1A1A1A; border-radius: 255px 15px 225px 15px/15px 225px 15px 255px; }
        .sketch-btn { border: 2.5px solid #1A1A1A; border-radius: 100px 20px 100px 20px/20px 100px 20px 100px; transition: all 0.3s ease; box-shadow: 4px 4px 0px #1A1A1A; }
        .sketch-btn:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0px #1A1A1A; }
        .sketch-btn:active { transform: translate(2px, 2px); box-shadow: 0px 0px 0px #1A1A1A; }
        .card-farm { background: #FFFFFF; border: 2px solid #1A1A1A; border-radius: 20px 80px 20px 80px / 80px 20px 80px 20px; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); overflow: hidden; }
        .card-farm:hover { transform: rotate(-1deg) translateY(-5px); }
        .farm-gradient { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); }
        .img-sketch { border-radius: 20px 80px 20px 80px / 80px 20px 80px 20px; border: 2px solid #1A1A1A; }
      `}} />

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 flex justify-between items-center bg-white/60 backdrop-blur-lg border-b-2 border-black/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 sketch-border flex items-center justify-center bg-yellow-400 rotate-3 hover:rotate-12 transition-transform cursor-pointer">
             <PenTool size={20} className="text-black" />
          </div>
          <span className="font-semibold tracking-tighter text-lg md:text-2xl uppercase text-black">BISMA<span className="text-green-600">.</span>REZA</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-10">
          {Object.keys(t.nav).map((key) => (
            <button 
              key={key} 
              onClick={() => handleNavClick(key)} 
              className={`text-xs tracking-[0.2em] uppercase transition-all relative px-2 py-1 font-bold ${activeTab === key ? 'text-black' : 'text-gray-400 hover:text-black'}`}
            >
              {t.nav[key as keyof typeof t.nav]}
              {activeTab === key && (
                <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 w-full h-0.75 bg-green-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button 
            onClick={() => setLang(prev => prev === 'id' ? 'en' : 'id')}
            className="sketch-btn px-4 py-2 text-xs font-bold bg-yellow-400 text-black"
          >
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-black/10 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Language Button */}
        <div className="hidden lg:flex items-center gap-4">
           <button 
            onClick={() => setLang(prev => prev === 'id' ? 'en' : 'id')}
            className="sketch-btn px-6 py-2 text-xs font-bold tracking-widest bg-yellow-400 text-black"
           >
             {lang === 'id' ? '🇮🇩 ID' : '🇺🇸 EN'}
           </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-b-2 border-black/10 lg:hidden"
          >
            <div className="p-4 space-y-2">
              {Object.keys(t.nav).map((key) => (
                <button
                  key={key}
                  onClick={() => handleNavClick(key)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-bold tracking-widest uppercase transition-all ${
                    activeTab === key
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {t.nav[key as keyof typeof t.nav]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 md:pt-40 pb-20 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          
          {/* --- BERANDA (HOME) --- */}
          {activeTab === 'home' && (
            <motion.section key="home" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="space-y-20">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24">
                {/* Profile Swipe Area */}
                <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 shrink-0">
                  <div className="absolute inset-0 sketch-border bg-white rotate-6" />
                  <div className="absolute inset-0 sketch-border bg-yellow-400 -rotate-3" />
                  
                  <div className="absolute inset-4 overflow-hidden bg-white border-2 border-black flex items-center justify-center" style={{ borderRadius: '40% 60% 70% 30% / 50% 70% 30% 50%' }}>
                    {profileOptions[profileIdx].type === 'image' ? (
                      <img src={profileOptions[profileIdx].value} className="w-full h-full object-cover object-top grayscale-0" alt="Bisma Reza" />
                    ) : (
                      <ThreeAnimal type={profileOptions[profileIdx].value} size={300} />
                    )}
                  </div>
                </div>

                {/* Hero Text */}
                <div className="flex-1 text-center md:text-left space-y-6 md:space-y-8 pt-6 md:pt-0">
                  <div className="space-y-4 md:space-y-6">
                    <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="doodle-font text-green-600 text-xl sm:text-2xl md:text-3xl flex items-center justify-center md:justify-start gap-2 md:gap-4">
                      <Sparkles size={20} className="sm:w-7 sm:h-7 text-yellow-500" /> {t.hero.tag}
                    </motion.span>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight md:leading-none text-black">
                      {t.hero.title} <br/>
                      <span className="text-sky-600 relative inline-block">
                        {t.hero.titleHighlight}
                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5, duration: 1 }} className="absolute -bottom-1 sm:-bottom-2 left-0 h-3 sm:h-4 bg-yellow-400/40 -z-10" />
                      </span>
                    </h1>
                  </div>
                  <p className="max-w-xl text-sm sm:text-base md:text-lg text-gray-600 font-medium leading-relaxed bg-white/40 p-3 sm:p-4 rounded-2xl border-2 border-black/5">{t.hero.desc}</p>
                  <div className="flex flex-wrap gap-3 sm:gap-6 justify-center md:justify-start pt-2 md:pt-4">
                    <button onClick={() => handleNavClick('works')} className="sketch-btn px-6 sm:px-12 py-3 sm:py-5 bg-black text-white text-xs sm:text-sm flex items-center gap-2 sm:gap-3 group">
                      <span className="font-black tracking-widest sm:tracking-[0.2em] uppercase">{t.hero.btn1}</span>
                      <ChevronRight size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                    <button onClick={() => handleNavClick('contact')} className="sketch-btn px-6 sm:px-12 py-3 sm:py-5 bg-white text-black text-xs sm:text-sm">
                      <span className="font-black tracking-widest sm:tracking-[0.2em] uppercase">{t.hero.btn2}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* --- KEAHLIAN (SKILLS) --- */}
          {activeTab === 'skills' && (
            <motion.section key="skills" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 md:space-y-20">
              <div className="text-center space-y-4 md:space-y-6">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-black">{t.skills.title}</h2>
                <p className="text-sky-600 doodle-font text-lg sm:text-xl md:text-2xl font-bold px-4">{t.skills.desc}</p>
                <div className="w-32 sm:w-40 h-2 bg-yellow-400 mx-auto rounded-full border-2 border-black" />
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                {t.skills.items.map((skill: typeof t.skills.items[0], i: number) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5 }}
                    className="p-6 md:p-10 card-farm farm-gradient group relative"
                  >
                    <div className="w-14 md:w-16 h-14 md:h-16 sketch-border flex items-center justify-center mb-6 md:mb-8 bg-white text-black shadow-[4px_4px_0px_#000]">
                      {React.cloneElement(skill.icon, { size: 24 })}
                    </div>
                    <h3 className="text-lg md:text-3xl font-black mb-6 md:mb-8 pb-4 border-b-4 border-black/5 text-black">{skill.name}</h3>
                    
                    <div className="space-y-6 md:space-y-8">
                      <div className="pl-4 md:pl-6 border-l-4 border-sky-400">
                        <p className="text-[9px] md:text-[10px] font-black tracking-widest text-sky-600 uppercase mb-2">{lang === 'id' ? 'Konteks' : 'Context'}</p>
                        <p className="text-xs md:text-sm text-gray-700 italic leading-relaxed">{skill.cause}</p>
                      </div>
                      <div className="pl-4 md:pl-6 border-l-4 border-green-500">
                        <p className="text-[9px] md:text-[10px] font-black tracking-widest uppercase mb-2 text-green-700">{lang === 'id' ? 'Solusi' : 'Solution'}</p>
                        <p className="text-xs md:text-sm font-bold text-black leading-relaxed">{skill.effect}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* --- KARYA (PROJECTS) --- */}
          {activeTab === 'works' && (
            <motion.section key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 md:space-y-16">
              <div className="text-center space-y-3 md:space-y-4 px-4">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight">{t.projects.title}</h2>
                <p className="text-green-600 doodle-font text-lg sm:text-xl md:text-2xl font-bold">{t.projects.desc}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
                {t.projects.items.map((project: typeof t.projects.items[0], i: number) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    className="card-farm bg-white flex flex-col group shadow-lg"
                  >
                    {/* Project Image */}
                    <div className="w-full h-40 sm:h-48 overflow-hidden border-b-2 border-black relative">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-500" 
                      />
                      <div className="absolute top-3 left-3 p-2 sm:p-3 sketch-border bg-white text-black shadow-md">
                        {React.cloneElement(project.icon, { size: 18 })}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-yellow-400 px-2 py-1 text-[8px] sm:text-[10px] font-black tracking-widest uppercase border-2 border-black">
                        {project.type}
                      </div>
                    </div>

                    <div className="p-5 md:p-8 flex flex-col flex-1">
                      <h3 className="text-lg md:text-2xl font-black mb-3 md:mb-4 group-hover:text-green-600 transition-colors text-black">{project.title}</h3>
                      <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed mb-6 md:mb-8 flex-1">{project.story}</p>
                      
                      <a href={project.url} target="_blank" rel="noreferrer" className="flex items-center justify-between pt-4 md:pt-6 border-t-2 border-black/5 text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase group/link text-black hover:text-green-600 transition-colors">
                        <span>{lang === 'id' ? 'Buka Portofolio' : 'Open Portfolio'}</span>
                        <ExternalLink size={14} className="md:w-4.5 md:h-4.5 group-hover/link:translate-x-2 group-hover/link:-translate-y-2 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                ))}
                
                {/* Doodle Placeholder */}
                <div className="card-farm border-dashed border-gray-300 p-8 md:p-10 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 bg-sky-100/30">
                  <ThreeAnimal type="duck" size={120} />
                  <p className="text-[10px] md:text-[12px] font-black tracking-[0.2em] md:tracking-[0.3em] text-sky-400 uppercase leading-relaxed px-2">
                    {lang === 'id' ? 'Ide besar berikutnya...' : 'Next big idea...'}
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {/* --- JURNAL (EXPERIENCE) --- */}
          {activeTab === 'exp' && (
            <motion.section key="exp" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="max-w-4xl mx-auto space-y-12 md:space-y-20 px-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-4 border-black pb-6 md:pb-10">
                <div className="space-y-3 md:space-y-4 text-center md:text-left">
                  <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-black">{t.journal.title}</h2>
                  <p className="text-green-600 doodle-font text-lg sm:text-xl md:text-2xl font-bold">{t.journal.desc}</p>
                </div>
                <div className="flex gap-4 md:gap-6 p-3 md:p-4 sketch-border bg-yellow-400 rotate-3 shadow-[8px_8px_0px_#000] shrink-0">
                   <Briefcase size={20} className="md:w-7 md:h-7 text-black" />
                   <GraduationCap size={20} className="md:w-7 md:h-7 text-black" />
                </div>
              </div>

              <div className="relative pl-6 md:pl-20 space-y-12 md:space-y-24">
                <div className="absolute left-0 top-0 w-2 h-full bg-black/5 rounded-full overflow-hidden">
                  <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 2 }} className="w-full bg-green-500" />
                </div>

                {t.journal.items.map((item: typeof t.journal.items[0], i: number) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-8 md:-left-13.5 lg:-left-18.5 top-4 w-8 md:w-10 h-8 md:h-10 sketch-border bg-white z-10 flex items-center justify-center shadow-md">
                      <div className="w-3 md:w-4 h-3 md:h-4 rounded-full bg-yellow-500" />
                    </div>
                    
                    <div className="grid md:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr] gap-6 md:gap-12">
                      <div className="text-sm md:text-lg font-black tracking-tighter pt-2 md:pt-4 text-sky-500 group-hover:text-black transition-colors">
                        {item.year}
                      </div>
                      <div className="space-y-4 md:space-y-6 pb-12 md:pb-16 border-b-2 border-black/5 last:border-0">
                        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between items-start gap-3 md:gap-4">
                          <h3 className="text-lg md:text-3xl font-black text-black leading-tight">{item.role}</h3>
                          <span className="text-xs md:text-sm doodle-font font-black text-white bg-green-500 px-4 md:px-6 py-2 rounded-full sketch-border rotate-2 whitespace-nowrap">{item.org}</span>
                        </div>
                        <p className="text-gray-600 text-sm md:text-xl font-medium leading-relaxed italic">
                          "{item.story}"
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-3 pt-3 md:pt-4">
                          {item.tags.map((tag: string, idx: number) => (
                            <span key={idx} className="px-3 md:px-5 py-1.5 md:py-2 bg-white border-2 border-black text-[8px] md:text-xs font-black tracking-widest text-black uppercase rounded-lg shadow-[4px_4px_0px_#000]">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Education */}
                <div className="pt-6 md:pt-10 space-y-8 md:space-y-12">
                  <div className="flex items-center gap-3 md:gap-6 text-sky-600">
                    <GraduationCap size={28} className="md:w-10 md:h-10 sketch-border p-1.5 md:p-2 bg-white" />
                    <h4 className="text-sm md:text-lg font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-black">{lang === 'id' ? 'Pendidikan' : 'Education'}</h4>
                  </div>
                  {t.journal.edu.map((e: typeof t.journal.edu[0], idx: number) => (
                    <div key={idx} className="grid md:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr] gap-6 md:gap-12 bg-white/60 p-5 md:p-8 card-farm">
                      <div className="text-sm md:text-lg font-black text-sky-300">{e.year}</div>
                      <div className="space-y-2 md:space-y-4">
                        <h5 className="text-xl md:text-3xl font-black text-black">{e.degree}</h5>
                        <p className="text-green-600 doodle-font text-lg md:text-2xl font-bold">{e.univ}</p>
                        <p className="text-xs md:text-base text-gray-500 font-medium">{e.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* --- KONTAK (CONTACT) --- */}
          {activeTab === 'contact' && (
            <motion.section key="contact" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 px-4">
              
              <div className="space-y-8 md:space-y-12">
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-black">{t.contact.title}</h2>
                  <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed doodle-font text-green-600">{t.contact.info}</p>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {t.contact.links.map((link: typeof t.contact.links[0], i: number) => (
                    <motion.a 
                      key={i} 
                      href={link.url}
                      target="_blank" 
                      rel="noreferrer"
                      whileHover={{ x: 15, rotate: -1 }}
                      className="flex items-center gap-4 md:gap-8 p-5 md:p-8 card-farm farm-gradient group border-2 border-black shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] transition-all"
                    >
                      <div className="text-black bg-white p-3 md:p-4 sketch-border shadow-md group-hover:bg-yellow-400 transition-colors shrink-0">
                        {React.cloneElement(link.icon, { size: 20 })}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] md:text-[12px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-sky-600 mb-0.5 md:mb-1">{link.label}</p>
                        <p className="text-lg md:text-2xl font-black text-black truncate">{link.val}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6 md:gap-10">
                <div className="flex-1 card-farm bg-black p-6 md:p-12 text-white flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                  {/* Decorative Animal Inside Card */}
                  <div className="absolute top-[-10%] right-[-10%] opacity-20 scale-100 md:scale-150 rotate-12">
                    <ThreeAnimal type="sheep" size={200} />
                  </div>
                  
                  <div className="space-y-4 md:space-y-8 relative z-10">
                    <p className="doodle-font text-green-400 text-lg md:text-3xl font-bold">Let's sow the seeds of innovation together.</p>
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight tracking-tighter">Siap untuk <br/> berinovasi <br/> bersama?</h3>
                  </div>

                  <div className="space-y-4 md:space-y-6 relative z-10 pt-8 md:pt-16">
                    <div className="flex items-center gap-3 md:gap-4 text-sky-300">
                      <MapPin size={20} className="md:w-7 md:h-7 shrink-0" />
                      <span className="text-xs md:text-base font-black tracking-[0.2em] md:tracking-[0.4em] uppercase">{t.contact.loc}</span>
                    </div>
                    <div className="flex gap-2 md:gap-4">
                       {[...Array(5)].map((_, i) => <Star key={i} size={16} className="md:w-5 md:h-5 text-yellow-400" fill="currentColor" />)}
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-10 card-farm bg-yellow-400 flex items-center justify-between border-2 border-black shadow-[8px_8px_0px_#000] flex-wrap gap-4">
                   <div className="space-y-1 md:space-y-2">
                      <p className="text-[10px] md:text-[12px] font-black tracking-widest text-black/50 uppercase">Status</p>
                      <p className="text-sm md:text-xl font-black flex items-center gap-2 text-black">
                        <span className="w-3 md:w-4 h-3 md:h-4 rounded-full bg-green-600 animate-pulse border-2 border-black" />
                        <span className="text-xs md:text-base">Ready to Collaborate</span>
                      </p>
                   </div>
                   <div className="w-16 md:w-20 h-16 md:h-20 bg-white sketch-border flex items-center justify-center text-3xl md:text-5xl rotate-12 shadow-md shrink-0">
                     🚜
                   </div>
                </div>
              </div>
            </motion.section>
          )}

        </AnimatePresence>
      </main>

      {/* --- FOOTER (ANIMAL PARADE) --- */}
      <div className="bg-green-400/20 py-20 mt-20 relative overflow-hidden border-t-4 border-black">
        <div className="max-w-6xl mx-auto px-6 flex justify-around items-center opacity-80">
           <div className="hover:scale-150 transition-transform"><ThreeAnimal type="duck" size={100} /></div>
           <div className="hover:scale-150 transition-transform"><ThreeAnimal type="sheep" size={100} /></div>
           <div className="hidden md:block hover:scale-150 transition-transform"><ThreeAnimal type="cow" size={100} /></div>
           <div className="hover:scale-150 transition-transform"><ThreeAnimal type="goat" size={100} /></div>
           <div className="hover:scale-150 transition-transform"><ThreeAnimal type="chicken" size={100} /></div>
        </div>
        
        {/* Scrolling text effect */}
        <div className="absolute bottom-4 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-10">
           <p className="text-[120px] font-black tracking-tighter uppercase inline-block animate-pulse text-black">
             Growth ⭘ Nature ⭘ Integrity ⭘ Future ⭘ Farm ⭘ Data ⭘ 
           </p>
        </div>
      </div>

      <footer className="py-20 px-6 border-t-4 border-black bg-white relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-yellow-400 sketch-border shadow-[4px_4px_0px_#000]">
                <Coffee size={24} className="text-black" />
              </div>
              <span className="text-lg font-black tracking-[0.5em] uppercase text-black">Bisma Reza © 2026</span>
            </div>
            <p className="text-md text-gray-500 font-bold leading-relaxed max-w-sm doodle-font">
              Made with ❤️ and ⚠️ about detail.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-8">
            <div className="flex gap-3">
              <div className="w-12 h-3 bg-black rounded-full" />
              <div className="w-12 h-3 bg-sky-400 rounded-full" />
              <div className="w-12 h-3 bg-green-500 rounded-full" />
              <div className="w-12 h-3 bg-yellow-400 rounded-full" />
            </div>
            <div className="flex items-center gap-4 bg-red-50 px-6 py-3 sketch-border border-red-500">
               <Heart size={20} className="text-red-500" fill="currentColor" />
               <span className="text-xs font-black tracking-[0.4em] uppercase text-red-600">Free Palestine</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;