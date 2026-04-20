'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { 
  ChevronRight, ExternalLink, 
  Sparkles, Cloud, Coffee, Globe, Shield, BarChart3, Cpu, Leaf,
  Mail, Linkedin, Github, Instagram, MapPin, 
  GraduationCap, Heart, Menu, X
} from 'lucide-react';

// --- 3D COMPONENT (Kintsugi Origami Theme) ---
const ThreeAnimal = ({ type = 'chicken', size = 150 }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(size, size);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    
    // Technicolor palette inspired by kintsugi + origami folds
    const matWhite = new THREE.MeshToonMaterial({ color: 0xf8f4ff });
    const matBlack = new THREE.MeshToonMaterial({ color: 0x1b1230 });
    const matRed = new THREE.MeshToonMaterial({ color: 0xff4d8d });
    const matYellow = new THREE.MeshToonMaterial({ color: 0xf7bf45 });
    const matPink = new THREE.MeshToonMaterial({ color: 0xff9bd5 });
    const matGrey = new THREE.MeshToonMaterial({ color: 0x7b6dff });

    // Helper: Eye Creator
    const addEyes = (parent: THREE.Object3D, x: number, y: number, z: number) => {
      const eyeGeo = new THREE.SphereGeometry(0.05, 8, 8);
      const eyeL = new THREE.Mesh(eyeGeo, matBlack);
      eyeL.position.set(x, y, z);
      const eyeR = new THREE.Mesh(eyeGeo, matBlack);
      eyeR.position.set(x, y, -z);
      parent.add(eyeL, eyeR);
    };

    // Animal Logic
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
    
    // Vibrant showroom lighting
    scene.add(new THREE.AmbientLight(0xf4ecff, 1.1));
    const light = new THREE.DirectionalLight(0xffffff, 0.95);
    light.position.set(5, 5, 5);
    scene.add(light);

    camera.position.z = 2.5;

    let requestID: number | null = null;
    const animate = () => {
      requestID = requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      group.position.y = Math.sin(Date.now() * 0.001) * 0.05; // Gentle floating
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (requestID !== null) cancelAnimationFrame(requestID);
      if (mount && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [type, size]);

  return <div ref={mountRef} className="hover:scale-110 transition-transform duration-700 cursor-pointer drop-shadow-xl" />;
};

// --- DATA CONTENT (Kept exactly as provided) ---
const content = {
  id: {
    nav: { home: 'Beranda', skills: 'Keahlian', works: 'Karya', journal: 'Jurnal', contact: 'Kontak' },
    hero: {
      tag: "Business Analyst // Active",
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
          color: "#E28B78", // Soft Coral
          icon: <BarChart3 />
        },
        { 
          name: "AI/ML", 
          cause: "Banyak perusahaan saat ini masih terjebak dalam alur kerja manual yang repetitif dan memakan waktu, seperti entri data, pemrosesan dokumen, dan tugas administratif rutin lainnya. Ketergantungan pada proses manual ini tidak hanya menurunkan produktivitas, tetapi juga meningkatkan risiko kesalahan manusia (human error) yang dapat berdampak signifikan pada operasional.",
          effect: "Penerapan Artificial Intelligence (AI) dan Machine Learning (ML) menawarkan solusi melalui otomatisasi cerdas. Tidak seperti otomatisasi tradisional yang kaku, AI dan ML memungkinkan sistem untuk belajar dari data, mengenali pola, dan mengambil keputusan secara mandiri. Dengan mengintegrasikan teknologi ini, perusahaan dapat mengotomatisasi tugas-tugas kognitif yang kompleks, mempercepat alur kerja, dan memungkinkan staf manusia untuk fokus pada pekerjaan yang bernilai strategis dan kreatif.",
          color: "#7FB3D5", // Soft Blue
          icon: <Cpu />
        },
        { 
          name: "Penceritaan Data", 
          cause: "Meskipun visualisasi data mampu menyajikan fakta secara grafis, data tersebut sering kali gagal memicu tindakan jika tidak memiliki narasi yang kuat. Banyak pemangku kepentingan merasa kesulitan untuk memahami urgensi di balik grafik yang rumit atau tabel yang dingin, sehingga wawasan berharga berakhir hanya sebagai informasi tanpa implementasi nyata.",
          effect: "Data storytelling hadir sebagai solusi dengan menggabungkan visualisasi data yang akurat dengan narasi kontekstual. Dengan menyusun data ke dalam alur cerita yang memiliki awal, konflik, dan resolusi, analis dapat menghubungkan poin-poin data dengan pengalaman manusia. Pendekatan ini tidak hanya membuat informasi lebih mudah diingat, tetapi juga mampu membujuk audiens dan mengubah angka mentah menjadi keputusan strategis yang berdampak.",
          color: "#E0B75E", // Soft Gold
          icon: <Shield />
        },
        { 
          name: "Analitik Bisnis", 
          cause: "Di tengah pasar yang berubah dengan cepat, banyak organisasi kesulitan untuk menyelaraskan antara kebutuhan operasional harian dengan tujuan strategis jangka panjang. Sering kali terjadi kesenjangan komunikasi antara tim teknis (IT/pengembang) dan tim bisnis, yang mengakibatkan solusi yang dibangun tidak menjawab akar permasalahan atau tidak memberikan nilai bisnis yang diharapkan.",
          effect: "Analisis Bisnis hadir sebagai jembatan strategis yang mendefinisikan masalah, peluang, dan solusi yang efektif. Seorang analis bisnis menggunakan teknik pengumpulan kebutuhan yang terstruktur, pemodelan proses, dan analisis data untuk memastikan bahwa setiap inisiatif—baik itu perubahan proses, pengembangan perangkat lunak, atau kebijakan baru—memberikan solusi yang tepat sasaran, efisien, dan memberikan nilai nyata bagi organisasi.",
          color: "#8DB596", // Sage Green
          icon: <BarChart3 />
        }
      ]
    },
    projects: {
      title: "Galeri Karya",
      desc: "Setiap proyek adalah sketsa solusi untuk tantangan nyata di lapangan.",
      items: [
        { title: "Pantau Cuaca/Weather Monicon (ID/EN)", type: "Data Science", icon: <Leaf />, color: "#8DB596", url: "https://weathermonicon.streamlit.app/", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80", story: "Aplikasi web interaktif yang menyediakan pemantauan cuaca secara real-time." },
        { title: "GoogieChatbot", type: "Chatbot", icon: <Globe />, color: "#E28B78", url: "https://googiechatbot.netlify.app/", image: "https://plus.unsplash.com/premium_photo-1726550550053-6e5f7190f1bf?q=80&w=800", story: "Platform percakapan berbasis AI yang intuitif dengan kapabilitas obrolan waktu nyata dan respons yang dapat disesuaikan." },
        { title: "Pocket Qur'an (ID)", type: "Al-Quran", icon: <Shield />, color: "#7FB3D5", url: "https://pocketquran.netlify.app/", image: "https://images.unsplash.com/photo-1576764402988-7143f9cca90a?q=80&w=800", story: "Al-Qur'an digital dengan teks resolusi tinggi, terjemahan multibahasa, dan audio."},
        { title: "TenderCrawler", type: "Research", icon: <BarChart3 />, color: "#E0B75E", url: "https://n8n.data-collect.id/workflow/3vLo4muHhBT9TgFR", image: "https://plus.unsplash.com/premium_photo-1681010317789-68f31df3b9b0?q=80&w=800", story: "Mesin otomatisasi berperforma tinggi untuk memantau portal pengadaan sektor pemerintah dan swasta."},
        { title: "NeuralScribe", type: "Deep Learning", icon: <Cpu />, color: "#E28B78", url: "https://neural-scribe.netlify.app/", image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=870", story: "Model pemrosesan bahasa alami yang meringkas rekam medis kompleks menjadi laporan yang mudah dipahami oleh pasien." },
        { title: "Graceful Compendium", type: "Archiving", icon: <Cloud />, color: "#E28B78", url: "https://gracefulcompendium.netlify.app/", image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?q=80&w=870", story: "Kumpulan arsip untuk mereka yang mencari potongan-potongan pengetahuan."}
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
    nav: { home: 'Home', skills: 'Skills', works: 'Works', journal: 'Journal', contact: 'Contact' },
    hero: {
      tag: "Business Analyst // Active",
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
          color: "#E28B78",
          icon: <BarChart3 />
        },
        { 
          name: "AI/ML", 
          cause: "Many organizations today remain bogged down by repetitive, time-consuming manual workflows, such as data entry, document processing, and other routine administrative tasks. Relying on these manual processes not only hampers productivity but also increases the risk of human error, which can have significant consequences for business operations.",
          effect: "The implementation of Artificial Intelligence (AI) and Machine Learning (ML) offers a solution through intelligent automation. Unlike traditional, rigid automation, AI and ML empower systems to learn from data, recognize patterns, and make decisions autonomously. By integrating these technologies, companies can automate complex cognitive tasks, accelerate workflows, and allow human staff to focus on higher-value strategic and creative initiatives.",
          color: "#7FB3D5",
          icon: <Cpu />
        },
        { 
          name: "Data Storytelling", 
          cause: "While data visualization can present facts graphically, data often fails to inspire action if it lacks a compelling narrative. Many stakeholders struggle to grasp the urgency behind complex charts or cold tables, causing valuable insights to end up as mere information rather than actionable intelligence.",
          effect: "Data storytelling provides the solution by merging accurate data visualization with contextual narrative. By framing data within a story structure—complete with a beginning, a conflict, and a resolution—analysts can connect data points to the human experience. This approach not only makes information more memorable but also persuades audiences and transforms raw numbers into impactful strategic decisions.",
          color: "#E0B75E",
          icon: <Shield />
        },
        { 
          name: "Business Analytics", 
          cause: "In an rapidly evolving market, many organizations struggle to align day-to-day operational needs with long-term strategic goals. A recurring gap often emerges between technical teams and business stakeholders, resulting in solutions that fail to address the root cause of problems or deliver the expected business value.",
          effect: "Business Analytics serves as a strategic bridge that defines problems, opportunities, and effective solutions. A business analyst leverages structured requirements gathering, process modeling, and data analysis to ensure that every initiative—whether it is a process improvement, software development, or a new policy—delivers a targeted, efficient solution that provides tangible value to the organization.",
          color: "#8DB596",
          icon: <BarChart3 />
        }
      ]
    },
    projects: {
      title: "Works Gallery",
      desc: "Each project is a sketch of solutions for real-world challenges.",
      items: [
        { title: "Pantau Cuaca/Weather Monicon (ID/EN)", type: "Data Science", icon: <Leaf />, color: "#8DB596", url: "https://weathermonicon.streamlit.app/", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80", story: "Real-time Interactive web application providing weather monitoring." },
        { title: "GoogieChatbot", type: "Chatbot", icon: <Globe />, color: "#E28B78", url: "https://googiechatbot.netlify.app/", image: "https://plus.unsplash.com/premium_photo-1726550550053-6e5f7190f1bf?q=80&w=800", story: "Intuitive AI-powered conversational platform featuring real-time chat capabilities and custom responses." },
        { title: "Pocket Qur'an (ID)", type: "Al-Quran", icon: <Shield />, color: "#7FB3D5", url: "https://pocketquran.netlify.app/", image: "https://images.unsplash.com/photo-1576764402988-7143f9cca90a?q=80&w=800", story: "Digital Al-Qur'an with high-resolution text, multilingual translations, and audio." },
        { title: "TenderCrawler", type: "Research", icon: <BarChart3 />, color: "#E0B75E", url: "https://n8n.data-collect.id/workflow/3vLo4muHhBT9TgFR", image: "https://plus.unsplash.com/premium_photo-1681010317789-68f31df3b9b0?q=80&w=800", story: "High-performance automation engine to monitor government and private sector procurement portals." },
        { title: "NeuralScribe", type: "Deep Learning", icon: <Cpu />, color: "#E28B78", url: "https://neural-scribe.netlify.app/", image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=870", story: "Natural language processing model summarizing complex medical records into reports easily understood by patients." },
        { title: "Graceful Compendium", type: "Archiving", icon: <Cloud />, color: "#E28B78", url: "https://gracefulcompendium.netlify.app/", image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?q=80&w=870", story: "Collection of archives for those seeking pieces of knowledge."}
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
        { label: "LinkedIn", val: "linkedin.com/in/bismareza81", icon: <Linkedin />, url: "https://www.linkedin.com/in/bismareza81" },
        { label: "GitHub", val: "github.com/bismareza81", icon: <Github />, url: "https://www.github.com/bismareza81" },
        { label: "Instagram", val: "@bismareza_", icon: <Instagram />, url: "https://www.instagram.com/bismareza_" }
      ],
      loc: "Jabodetabek, Indonesia"
    }
  }
};

const App = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState('id');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
  
  const t = useMemo(() => content[lang as keyof typeof content], [lang]);

  const profileOptions = [
    { type: 'image', value: 'https://lh3.googleusercontent.com/pw/AP1GczORxNQG_VFbRW6mUg2DlkMEtMO80cTL3c5uuO1EVVNUPgldlKGZrr2CbasMyrVM7KzPryIHtW1ssTEeGUSVj_gdkdfuaUj_VobxSGXJ9_BVrfpxCmwROICdJyfS6qqfxd8B4w9Lofjk5EOWUE2eN3SY?w=800&h=800&fit=facearea&facepad=2', label: lang === 'id' ? 'Gambar Profil' : 'Profile Picture' },
  ];
    
  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    const routeMap: { [key: string]: string } = {
      home: '/',
      skills: '/skills',
      works: '/works',
      journal: '/journal',
      contact: '/contact',
      exp: '/journal'
    };
    router.push(routeMap[tab] || '/');
  };

  return (
    <div className="min-h-screen bg-[#0f0820] text-[#140f25] font-outfit selection:bg-[#f7bf45]/40 overflow-x-hidden relative">
      
      {/* Background Kintsugi + Origami Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-100" style={{ background: 'linear-gradient(135deg, #fff7fb 0%, #f1ecff 28%, #e9f6ff 52%, #fff5de 78%, #f3ffe7 100%)' }} />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(60deg, rgba(247,191,69,.45) 1px, transparent 1px), linear-gradient(120deg, rgba(255,77,141,.25) 1px, transparent 1px)', backgroundSize: '56px 56px' }} />
        <div className="absolute top-[-14%] left-[-8%] w-[38vw] h-[38vw] rounded-full bg-[#7b6dff]/30 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-6%] w-[36vw] h-[36vw] rounded-full bg-[#2dd4bf]/30 blur-3xl" />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        body { 
          font-family: 'Outfit', sans-serif; 
          background: linear-gradient(135deg, #fff7fb 0%, #f1ecff 28%, #e9f6ff 52%, #fff5de 78%, #f3ffe7 100%);
        }
        
        .font-lexend { font-family: 'Lexend', sans-serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        
        /* Card: colorful paper + kintsugi edge */
        .card-minimal { 
          background: rgba(255,255,255,0.86); 
          border-radius: 24px; 
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); 
          position: relative;
          border: 1px solid rgba(255,255,255,0.65);
          box-shadow: 0 18px 40px -16px rgba(46, 20, 82, 0.25);
          overflow: hidden;
          backdrop-filter: blur(8px);
        }
        .card-minimal:hover { 
          transform: translateY(-6px); 
          box-shadow: 0 26px 48px -16px rgba(46, 20, 82, 0.34);
        }
        
        /* Origami Fold Accent */
        .origami-fold-accent {
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 46px 46px 0;
          border-color: #f7bf45 #ff4d8d transparent transparent;
          box-shadow: -2px 2px 10px rgba(123,109,255,0.25);
          border-bottom-left-radius: 8px;
          z-index: 10;
          transition: all 0.3s ease;
        }
        .card-minimal:hover .origami-fold-accent {
          border-width: 0 54px 54px 0;
          box-shadow: -6px 6px 14px rgba(123,109,255,0.35);
        }

        .pill-nav {
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 100px;
          box-shadow: 0 14px 32px rgba(123,109,255,0.2);
        }

        .section-kintsugi-title {
          color: #24183d;
          text-shadow: 0 1px 0 rgba(255,255,255,0.65);
        }

        .kintsugi-subtle-text {
          color: #4f4a67;
        }

        .kintsugi-tag {
          background: linear-gradient(90deg, rgba(247,191,69,0.2), rgba(123,109,255,0.16));
          border: 1px solid rgba(123,109,255,0.2);
          color: #4f4a67;
        }
      `}} />

      {/* --- NAVIGATION (Minimalist Pill) --- */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none">
        <nav className="w-full max-w-5xl flex justify-between items-center pill-nav px-6 md:px-8 py-3 md:py-4 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff4d8d] via-[#7b6dff] to-[#2dd4bf] flex items-center justify-center text-white shadow-sm">
               <Sparkles size={16} />
            </div>
            <span className="font-lexend font-bold tracking-tight text-lg md:text-xl text-[#24183d]">Bisma<span className="text-[#7b6dff] font-light">.</span>Reza</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8">
            {Object.keys(t.nav).map((key) => (
              <button 
                key={key} 
                onClick={() => handleNavClick(key)} 
                className={`font-lexend text-sm tracking-wide capitalize transition-all relative px-3 py-1 font-medium ${activeTab === key ? 'text-[#24183d]' : 'text-[#7a7398] hover:text-[#24183d]'}`}
              >
                {t.nav[key as keyof typeof t.nav]}
                {activeTab === key && (
                  <motion.div layoutId="nav-pill-bg" className="absolute inset-0 bg-gradient-to-r from-[#f7bf45]/30 to-[#7b6dff]/25 rounded-full -z-10" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button onClick={() => setLang(prev => prev === 'id' ? 'en' : 'id')} className="hidden lg:block px-4 py-1.5 rounded-full text-xs font-lexend font-medium text-[#5b5478] bg-white/80 hover:bg-white transition-colors border border-[#d6d0ea]">
              {lang === 'id' ? 'ID' : 'EN'}
            </button>
            
            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-full hover:bg-white/80 transition-colors text-[#5b5478]">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-28 left-4 right-4 z-40 bg-white/90 rounded-3xl shadow-[0_20px_40px_-10px_rgba(52,28,94,0.2)] border border-[#ddd6f1] lg:hidden overflow-hidden backdrop-blur-md"
          >
            <div className="p-4 flex flex-col gap-2">
              {Object.keys(t.nav).map((key) => (
                <button
                  key={key}
                  onClick={() => handleNavClick(key)}
                  className={`w-full text-left px-6 py-4 rounded-2xl font-lexend font-medium capitalize transition-all ${
                    activeTab === key ? 'bg-gradient-to-r from-[#f7bf45]/20 to-[#7b6dff]/20 text-[#24183d]' : 'text-[#625a82] hover:bg-white/70'
                  }`}
                >
                  {t.nav[key as keyof typeof t.nav]}
                </button>
              ))}
              <div className="w-full h-px bg-[#e4ddf5] my-2" />
              <button onClick={() => setLang(prev => prev === 'id' ? 'en' : 'id')} className="w-full text-left px-6 py-4 rounded-2xl font-lexend font-medium text-[#625a82] hover:bg-white/70">
                Language: {lang === 'id' ? 'English' : 'Bahasa Indonesia'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-40 md:pt-48 pb-20 px-6 max-w-5xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          
          {/* --- BERANDA (HOME) --- */}
          {activeTab === 'home' && (
            <motion.section key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-16">
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
                {/* Profile Picture Minimalist */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 shrink-0">
                  <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] bg-white p-2">
                    <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                      <img
                        src={profileOptions[0].value}
                        className="w-full h-full object-cover object-top transition-all duration-700"
                        alt="Bisma Reza"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                  {/* Subtle Origami Decor on Profile */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#7b6dff] rounded-full blur-2xl opacity-40 -z-10" />
                </div>

                {/* Hero Text */}
                <div className="flex-1 text-center md:text-left space-y-6 md:space-y-8">
                  <div className="space-y-3 md:space-y-4">
                    <motion.span initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-lexend font-medium text-gray-500 text-sm md:text-base flex items-center justify-center md:justify-start gap-2 uppercase tracking-widest">
                      <Coffee size={16} className="text-[#ff4d8d]" /> {t.hero.tag}
                    </motion.span>
                    <h1 className="font-lexend text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-[#24183d]">
                      {t.hero.title} <br/>
                      <span className="text-[#7b6dff] font-light italic relative inline-block">
                        {t.hero.titleHighlight}
                        <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#7b6dff]/35" viewBox="0 0 100 10" preserveAspectRatio="none">
                          <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </span>
                    </h1>
                  </div>
                  <p className="text-base sm:text-lg text-[#4a4464] font-light leading-relaxed max-w-xl mx-auto md:mx-0">{t.hero.desc}</p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                    <button onClick={() => handleNavClick('works')} className="px-8 py-3.5 bg-gradient-to-r from-[#ff4d8d] via-[#7b6dff] to-[#2dd4bf] text-white rounded-full font-lexend text-sm font-medium transition-all shadow-md hover:shadow-xl flex items-center gap-2 group">
                      <span>{t.hero.btn1}</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button onClick={() => handleNavClick('contact')} className="px-8 py-3.5 bg-white/90 text-[#24183d] rounded-full font-lexend text-sm font-medium hover:bg-white transition-all border border-[#d6d0ea] shadow-sm">
                      <span>{t.hero.btn2}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* --- KEAHLIAN (SKILLS) --- */}
          {activeTab === 'skills' && (
            <motion.section key="skills" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
              <div className="text-center space-y-4 px-4">
                <h2 className="font-lexend text-4xl sm:text-5xl font-semibold tracking-tight section-kintsugi-title capitalize">{t.skills.title}</h2>
                <p className="kintsugi-subtle-text font-light text-lg">{t.skills.desc}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {t.skills.items.map((skill: typeof t.skills.items[0], i: number) => (
                  <motion.div key={i} className="card-minimal p-8 sm:p-10 group">
                    <div className="origami-fold-accent" />
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-white/70 border border-white/70 transition-colors" style={{ color: skill.color }}>
                      {React.cloneElement(skill.icon, { size: 24 })}
                    </div>
                    <h3 className="font-lexend text-2xl font-semibold mb-6 text-[#24183d]">{skill.name}</h3>
                    
                    <div className="space-y-6">
                      <div className="relative pl-6">
                        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#b9afdb]" />
                        <p className="font-lexend text-[10px] font-semibold tracking-widest text-[#7a7398] uppercase mb-2">{lang === 'id' ? 'Konteks' : 'Context'}</p>
                        <p className="text-sm text-[#5f5879] font-light leading-relaxed">{skill.cause}</p>
                      </div>
                      <div className="relative pl-6">
                        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                        <p className="font-lexend text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: skill.color }}>{lang === 'id' ? 'Solusi' : 'Solution'}</p>
                        <p className="text-sm font-normal text-[#24183d] leading-relaxed">{skill.effect}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* --- KARYA (PROJECTS) --- */}
          {activeTab === 'works' && (
            <motion.section key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
              <div className="text-center space-y-4 px-4">
                <h2 className="font-lexend text-4xl sm:text-5xl font-semibold tracking-tight section-kintsugi-title capitalize">{t.projects.title}</h2>
                <p className="kintsugi-subtle-text font-light text-lg">{t.projects.desc}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.projects.items.map((project: typeof t.projects.items[0], i: number) => (
                  <motion.div key={i} className="card-minimal flex flex-col group">
                    <div className="origami-fold-accent" />
                    {/* Project Image */}
                    <div className="w-full h-48 overflow-hidden relative p-2 pb-0">
                      <div className="w-full h-full rounded-t-2xl overflow-hidden relative">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur rounded-xl text-[#24183d] shadow-sm">
                        {React.cloneElement(project.icon, { size: 18, color: project.color })}
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col flex-1 bg-white/60">
                      <span className="font-lexend text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: project.color }}>{project.type}</span>
                      <h3 className="font-lexend text-xl font-semibold mb-3 text-[#24183d] leading-tight">{project.title}</h3>
                      <p className="text-sm text-[#5f5879] font-light leading-relaxed mb-6 flex-1">{project.story}</p>
                      
                      <a href={project.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium text-[#625a82] hover:text-[#24183d] transition-colors w-fit group/link">
                        <span>{lang === 'id' ? 'Lihat Detail' : 'View Details'}</span>
                        <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* --- JURNAL (EXPERIENCE) --- */}
          {activeTab === 'journal' && (
            <motion.section key="exp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-16">
              <div className="text-center space-y-4 px-4 pb-8 border-b border-[#e4ddf5]">
                <h2 className="font-lexend text-4xl sm:text-5xl font-semibold tracking-tight section-kintsugi-title capitalize">{t.journal.title}</h2>
                <p className="kintsugi-subtle-text font-light text-lg">{t.journal.desc}</p>
              </div>

              <div className="space-y-16 relative">
                {t.journal.items.map((item: typeof t.journal.items[0], i: number) => (
                  <div key={i} className="card-minimal p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-12 group">
                     <div className="origami-fold-accent" />
                     <div className="md:w-48 shrink-0">
                        <span className="inline-block px-3 py-1 kintsugi-tag rounded-full text-xs font-semibold mb-4">{item.year}</span>
                        <div className="flex items-center gap-2 text-[#7b6dff] font-medium text-sm mt-1">
                          <MapPin size={14} /> {item.org}
                        </div>
                     </div>
                     <div className="flex-1 space-y-4">
                        <h3 className="font-lexend text-2xl font-semibold text-[#24183d]">{item.role}</h3>
                        <p className="text-[#5f5879] font-light leading-relaxed text-sm md:text-base">
                          {item.story}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {item.tags.map((tag: string, idx: number) => (
                            <span key={idx} className="px-3 py-1 bg-white/70 text-[#625a82] font-medium text-[10px] tracking-wide rounded-lg border border-white/70">
                              {tag}
                            </span>
                          ))}
                        </div>
                     </div>
                  </div>
                ))}

                {/* Education */}
                <div className="pt-12 space-y-8">
                  <h3 className="font-lexend text-2xl font-semibold text-[#24183d] flex items-center gap-3">
                    <GraduationCap size={24} className="text-[#ff4d8d]" /> 
                    {lang === 'id' ? 'Pendidikan' : 'Education'}
                  </h3>
                  {t.journal.edu.map((e: typeof t.journal.edu[0], idx: number) => (
                    <div key={idx} className="card-minimal p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-12">
                      <div className="origami-fold-accent" />
                      <div className="md:w-48 shrink-0">
                         <span className="inline-block px-3 py-1 kintsugi-tag rounded-full text-xs font-semibold">{e.year}</span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <h5 className="font-lexend text-xl font-semibold text-[#24183d]">{e.degree}</h5>
                        <p className="text-[#7b6dff] font-medium">{e.univ}</p>
                        <p className="text-[#5f5879] font-light text-sm md:text-base leading-relaxed">{e.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* --- KONTAK (CONTACT) --- */}
          {activeTab === 'contact' && (
            <motion.section key="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-16">
              <div className="text-center space-y-4 px-4 pb-8">
                <h2 className="font-lexend text-4xl sm:text-5xl font-semibold tracking-tight section-kintsugi-title capitalize">{t.contact.title}</h2>
                <p className="kintsugi-subtle-text font-light text-lg max-w-xl mx-auto">{t.contact.info}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="card-minimal p-8 md:p-10 space-y-8 flex flex-col justify-center">
                  <div className="origami-fold-accent" />
                  <div className="space-y-6">
                    {t.contact.links.map((link: typeof t.contact.links[0], i: number) => (
                      <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-white/80 border border-white/80 flex items-center justify-center text-[#7a7398] group-hover:bg-[#ff4d8d] group-hover:text-white transition-colors">
                          {React.cloneElement(link.icon, { size: 18 })}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold tracking-widest uppercase text-[#7a7398]">{link.label}</p>
                          <p className="text-sm font-medium text-[#24183d] group-hover:text-[#ff4d8d] transition-colors">{link.val}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="card-minimal p-8 md:p-10 bg-gradient-to-br from-[#7b6dff] via-[#ff4d8d] to-[#2dd4bf] text-black flex flex-col justify-between">
                  <div className="origami-fold-accent" style={{ borderTopColor: '#f7bf45', borderRightColor: '#f7bf45' }} />
                  <div className="space-y-6">
                    <Cloud size={32} className="text-black/80" />
                    <h3 className="font-lexend text-3xl font-semibold leading-tight">Let's build<br/> something <br/> together.</h3>
                  </div>
                  <div className="pt-12 flex items-center gap-3">
                    <MapPin size={18} className="opacity-80" />
                    <span className="text-sm font-medium tracking-wide">{t.contact.loc}</span>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

        </AnimatePresence>
      </main>

      {/* --- FOOTER --- */}
      <footer className="mt-20 border-t border-[#d8d1ee] bg-white/55 backdrop-blur-sm relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 py-10 px-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-lexend text-lg font-semibold text-[#24183d] tracking-tight">Bisma Reza © 2026</span>
            <p className="text-xs text-[#5f5879] font-light">"Indeed, We will not allow to be lost the reward of any who did well in deeds." (QS: 18:30).</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full border border-red-100">
               <Heart size={14} className="text-[#EE2A35]" fill="currentColor" />
               <span className="font-lexend text-[10px] font-semibold tracking-widest uppercase text-red-800">Made by Bisma Reza</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;