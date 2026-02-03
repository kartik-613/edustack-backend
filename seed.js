const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const University = require('./src/models/University');
const Course = require('./src/models/Course');
const Branch = require('./src/models/Branch');
const Semester = require('./src/models/Semester');
const Subject = require('./src/models/Subject');
const Content = require('./src/models/Content');
const User = require('./src/models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const universitiesData = [
    { name: 'Dr. Harisingh Gour Vishwavidyalaya', city: 'Sagar', type: 'central' },
    { name: 'Devi Ahilya Vishwavidyalaya (DAVV)', city: 'Indore', type: 'state_large' },
    { name: 'Barkatullah University', city: 'Bhopal', type: 'state_large' },
    { name: 'Awadhesh Pratap Singh University', city: 'Rewa', type: 'state_large' },
    { name: 'Jiwaji University', city: 'Gwalior', type: 'state_large' },
    { name: 'Indira Gandhi National Tribal University (IGNTU)', city: 'Amarkantak', type: 'tribal' },
    { name: 'Jawaharlal Nehru Agricultural University', city: 'Jabalpur', type: 'agri' },
    { name: 'Madhya Pradesh Bhoj Open University', city: 'Bhopal', type: 'open' },
    { name: 'Makhanlal Chaturvedi National University of Journalism', city: 'Bhopal', type: 'journalism' },
    { name: 'National Law Institute University (NLIU)', city: 'Bhopal', type: 'law' },
    { name: 'Rajiv Gandhi Technical University (RGPV)', city: 'Bhopal', type: 'tech_large' },
    { name: 'Rajmata Vijayaraje Scindia Krishi Vishwa Vidyalaya', city: 'Gwalior', type: 'agri' },
    { name: 'Rani Durgavati Vishwavidyalaya', city: 'Jabalpur', type: 'state_large' },
    { name: 'Nanaji Deshmukh Veterinary Science University', city: 'Jabalpur', type: 'vet' },
    { name: 'Madhya Pradesh Medical Science University', city: 'Jabalpur', type: 'medical_large' },
    { name: 'Maharshi Panini Sanskrit Evam Vedic Vishwavidyalaya', city: 'Ujjain', type: 'sanskrit' },
    { name: 'Mahatma Gandhi Chitrakoot Gramodaya University', city: 'Chitrakoot', type: 'rural' },
    { name: 'Sanchi University of Buddhist-Indic Studies', city: 'Sanchi', type: 'sanskrit' },
    { name: 'IIITDM Jabalpur', city: 'Jabalpur', type: 'iiit' },
    { name: 'IIITM Gwalior', city: 'Gwalior', type: 'iiit' },
    { name: 'Lakshmibai National University of Physical Education', city: 'Gwalior', type: 'sports' },
    { name: 'AKS University', city: 'Satna', type: 'pvt_multi' },
    { name: 'Amity University', city: 'Gwalior', type: 'pvt_multi' },
    { name: 'Abhyuday University', city: 'Khargone', type: 'pvt_small' },
    { name: 'Amaltas University', city: 'Dewas', type: 'medical_pvt' },
    { name: 'Aryavart University', city: 'Sehore', type: 'pvt_small' },
    { name: 'Avantika University', city: 'Ujjain', type: 'design' },
    { name: 'Bhabha University', city: 'Bhopal', type: 'pvt_multi' },
    { name: 'Chirayu University', city: 'Bhainsakhedi', type: 'medical_pvt' },
    { name: 'Dr. A.P.J. Abdul Kalam University', city: 'Indore', type: 'pvt_multi' },
    { name: 'Dr. Preeti Global University', city: 'Shivpuri', type: 'pvt_small' },
    { name: 'Eklavya University', city: 'Damoh', type: 'pvt_multi' },
    { name: 'G.H. Raisoni University', city: 'Chhindwara', type: 'pvt_multi' },
    { name: 'Gyanodaya University', city: 'Neemuch', type: 'pvt_small' },
    { name: 'Gyanveer University', city: 'Sagar', type: 'pvt_small' },
    { name: 'ITM University', city: 'Gwalior', type: 'pvt_multi' },
    { name: 'I.E.S. University', city: 'Bhopal', type: 'pvt_multi' },
    { name: 'Jagran Lakecity University (JLU)', city: 'Bhopal', type: 'pvt_arts' },
    { name: 'LNCT University', city: 'Bhopal', type: 'pvt_multi' },
    { name: 'Mangalayatan University', city: 'Jabalpur', type: 'pvt_multi' },
    { name: 'Malwanchal University', city: 'Indore', type: 'medical_pvt' },
    { name: 'Mansarovar Global University', city: 'Sehore', type: 'pvt_multi' },
    { name: 'Medi-Caps University', city: 'Indore', type: 'pvt_multi' },
    { name: 'Mandsaur University', city: 'Mandsaur', type: 'pvt_multi' },
    { name: 'Patel College (PCST University)', city: 'Bhopal', type: 'pvt_multi' },
    { name: 'Rabindranath Tagore University', city: 'Bhopal', type: 'pvt_multi' },
    { name: 'Sri Satya Sai University', city: 'Sehore', type: 'pvt_multi' },
    { name: 'Swami Vivekanand University', city: 'Sagar', type: 'tech_large' },
    { name: 'Symbiosis University', city: 'Indore', type: 'pvt_multi' },
    { name: 'Techno Global University', city: 'Vidisha', type: 'pvt_multi' }
];

const courseTemplates = {
    tech_large: [
        { name: 'B.Tech', semCount: 8, branches: ['Computer Science', 'IT', 'Mechanical', 'Civil', 'Electrical'] },
        { name: 'M.Tech', semCount: 4, branches: ['Software Engineering', 'VLSI Design'] },
        { name: 'MBA', semCount: 4, branches: ['Marketing', 'Finance', 'HR'] }
    ],
    state_large: [
        { name: 'B.A', semCount: 6, branches: ['Hindi', 'English', 'Sanskrit', 'History', 'Pol Sc'] },
        { name: 'B.Sc', semCount: 6, branches: ['Physics', 'Chemistry', 'Maths', 'Biology'] },
        { name: 'B.Com', semCount: 6, branches: ['Accounting', 'Taxation'] }
    ],
    iiit: [
        { name: 'B.Tech', semCount: 8, branches: ['Computer Science', 'Electronics'] },
        { name: 'M.Des', semCount: 4, branches: ['Product Design', 'Visual Communication'] }
    ],
    medical_large: [
        { name: 'MBBS', semCount: 9, branches: ['General'] },
        { name: 'B.Sc Nursing', semCount: 8, branches: ['General'] }
    ]
};

const subjectsBySem = {
    'B.Tech': {
        1: ['Mathematics-I', 'Physics', 'Bee', 'Engg Graphics'],
        2: ['Mathematics-II', 'Chemistry', 'BME', 'Communication Skills'],
        3: ['Data Structures', 'Analog Electronics', 'Discrete Maths'],
        4: ['Operating Systems', 'COA', 'Digital Electronics'],
        5: ['Database Management', 'Machine Learning', 'Java'],
        6: ['Cloud Computing', 'Computer Networks', 'Software Engg'],
        7: ['Internet of Things', 'Cyber Security', 'Neural Networks'],
        8: ['Major Project', 'Industrial Training', 'Professional Ethics']
    },
    'M.Tech': {
        1: ['Advanced Algorithms', 'Parallel Computing'],
        2: ['Big Data Analytics', 'System Design'],
        3: ['Cloud Infra', 'Seminar'],
        4: ['Dissertation Phase-II']
    },
    'B.A': {
        1: ['Hindi Literature-I', 'English Language-I'],
        2: ['Hindi Literature-II', 'English Language-II'],
        3: ['History of India', 'Political Science-I'],
        4: ['Medieval History', 'Political Science-II'],
        5: ['Modern History', 'Sociology-I'],
        6: ['Contemporary Issues', 'Sociology-II']
    }
};

const defaultSubjects = ['Foundation Course-I', 'Foundation Course-II', 'Elective-I', 'Elective-II'];

const seedData = async () => {
    try {
        await connectDB();
        console.log('--- RE-SEEDING WITH FULL SEMESTERS & SUBJECTS ---');

        await University.deleteMany();
        await Course.deleteMany();
        await Branch.deleteMany();
        await Semester.deleteMany();
        await Subject.deleteMany();
        await Content.deleteMany();

        for (const uniData of universitiesData) {
            const uni = await University.create({
                name: uniData.name,
                city: uniData.city,
                description: `${uniData.type.toUpperCase()} University in ${uniData.city}`,
                logo: '🏫'
            });

            const templates = courseTemplates[uniData.type] || courseTemplates.state_large;

            for (const temp of templates) {
                const course = await Course.create({
                    universityId: uni._id,
                    name: temp.name,
                    description: `${temp.name} Degree Program`,
                    duration: `${temp.semCount / 2} Years`
                });

                for (const brName of temp.branches) {
                    const branch = await Branch.create({
                        universityId: uni._id,
                        courseId: course._id,
                        name: brName,
                        description: `${brName} Specialization`
                    });

                    for (let s = 1; s <= temp.semCount; s++) {
                        const sem = await Semester.create({
                            universityId: uni._id,
                            courseId: course._id,
                            branchId: branch._id,
                            name: `Semester ${s}`
                        });

                        const subList = subjectsBySem[temp.name]?.[s] || defaultSubjects;

                        for (const subName of subList) {
                            const subject = await Subject.create({
                                universityId: uni._id,
                                courseId: course._id,
                                branchId: branch._id,
                                semesterId: sem._id,
                                name: subName,
                                code: `${subName.substring(0, 3).toUpperCase()}-${s}0${Math.floor(Math.random() * 9)}`
                            });

                            await Content.create([
                                {
                                    subjectId: subject._id,
                                    type: 'syllabus',
                                    title: `${subName} Syllabus`,
                                    fileUrl: '#',
                                    approved: true
                                },
                                {
                                    subjectId: subject._id,
                                    type: 'videos',
                                    title: `${subName} Intro Lecture`,
                                    videoUrl: 'https://www.youtube.com/embed/bcSW30g_W8w',
                                    unit: 1,
                                    approved: true
                                }
                            ]);
                        }
                    }
                }
            }
            console.log(`✓ Seeded ${uni.name}`);
        }

        console.log('--- DATABASE SUCCESSFULLY RE-SEEDED WITH FULL STRUCTURE ---');
        process.exit();
    } catch (e) {
        console.error('Seeding Error:', e);
        process.exit(1);
    }
};

seedData();
