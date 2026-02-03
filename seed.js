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
    {
        name: 'Dr. Harisingh Gour Vishwavidyalaya',
        city: 'Sagar',
        type: 'specific',
        courses: [
            { name: 'B.A.', semCount: 6, branches: ['General', 'Literature', 'Social Sciences'] },
            { name: 'B.Sc.', semCount: 6, branches: ['Physics', 'Chemistry', 'Maths', 'Biology'] },
            { name: 'B.Com.', semCount: 6, branches: ['General', 'Accounting'] },
            { name: 'BBA', semCount: 6, branches: ['Management'] },
            { name: 'BCA', semCount: 6, branches: ['Computer Applications'] },
            { name: 'B.Lib.I.Sc.', semCount: 2, branches: ['Library Science'] },
            { name: 'BFA', semCount: 8, branches: ['Fine Arts'] },
            { name: 'BHMCT', semCount: 8, branches: ['Hotel Management'] },
            { name: 'B.Pharm', semCount: 8, branches: ['Pharmacy'] },
            { name: 'LLB / B.A. LL.B.', semCount: 10, branches: ['Law'] },
            { name: 'B.Sc.B.Ed. / B.Ed.', semCount: 8, branches: ['Education'] },
            { name: 'B.Tech / B.E.', semCount: 8, branches: ['CSE', 'ME', 'ECE', 'CE'] },
            { name: 'M.A.', semCount: 4, branches: ['General'] },
            { name: 'M.Sc.', semCount: 4, branches: ['General'] },
            { name: 'M.Com.', semCount: 4, branches: ['General'] },
            { name: 'MBA', semCount: 4, branches: ['Management'] },
            { name: 'M.Tech', semCount: 4, branches: ['General'] },
            { name: 'M.Pharm', semCount: 4, branches: ['General'] },
            { name: 'MCA', semCount: 4, branches: ['General'] },
            { name: 'M.Ed', semCount: 4, branches: ['General'] },
            { name: 'MJMC', semCount: 4, branches: ['Journalism'] },
            { name: 'MSW', semCount: 4, branches: ['Social Work'] },
            { name: 'M.Lib.I.Sc.', semCount: 2, branches: ['Library Science'] }
        ]
    },
    {
        name: 'Devi Ahilya Vishwavidyalaya (DAVV)',
        city: 'Indore',
        type: 'specific',
        courses: [
            { name: 'B.E.', semCount: 8, branches: ['Computer Engineering', 'Mechanical Engineering', 'Information Technology', 'Electronics & Instrumentation', 'Electronics & Telecommunication', 'Civil Engineering'] },
            { name: 'B.A.', semCount: 6, branches: ['Honours in Economics', 'Journalism & related fields'] },
            { name: 'B.Sc.', semCount: 6, branches: ['Electronics', 'Computer Science', 'Mathematics', 'Yoga Science'] },
            { name: 'B.S.W.', semCount: 6, branches: ['Social Work'] },
            { name: 'B.P.E.S.', semCount: 6, branches: ['Physical Education & Sports'] },
            { name: 'B.Voc.', semCount: 6, branches: ['General'] },
            { name: 'B.Com.', semCount: 6, branches: ['Accounting', 'Tax Management', 'Honours'] },
            { name: 'B.C.A.', semCount: 6, branches: ['Computer Applications'] },
            { name: 'B.Pharm', semCount: 8, branches: ['Pharmacy'] }
        ]
    },
    { name: 'Barkatullah University', city: 'Bhopal', type: 'state_large' },
    { name: 'Awadhesh Pratap Singh University', city: 'Rewa', type: 'state_large' },
    { name: 'Jiwaji University', city: 'Gwalior', type: 'state_large' },
    { name: 'Vikram University', city: 'Ujjain', type: 'state_large' },
    { name: 'Atal Bihari Vajpayee Hindi Vishwavidyalaya', city: 'Bhopal', type: 'state_large' },
    { name: 'Madhya Pradesh Bhoj Open University', city: 'Bhopal', type: 'state_large' },
    { name: 'Makhanlal Chaturvedi National University of Journalism & Communication', city: 'Bhopal', type: 'state_large' },
    { name: 'National Law Institute University (NLIU)', city: 'Bhopal', type: 'state_large' },
    { name: 'Rajiv Gandhi Prodoyogiki Vishwavidyalaya (RGPV)', city: 'Bhopal', type: 'tech_large' },
    { name: 'Jawaharlal Nehru Krishi Vishwa Vidyalaya', city: 'Jabalpur', type: 'state_large' },
    { name: 'Nanaji Deshmukh Veterinary Science University', city: 'Jabalpur', type: 'state_large' },
    { name: 'Madhya Pradesh Medical Science University', city: 'Jabalpur', type: 'medical_large' },
    { name: 'Maharshi Panini Sanskrit Evam Vedic Vishwavidyalaya', city: 'Ujjain', type: 'state_large' },
    { name: 'Maharaja Chhatrasal Bundelkhand Vishwavidyalaya', city: 'Chhatarpur', type: 'state_large' },
    { name: 'Dr. B.R. Ambedkar University of Social Sciences', city: 'Mhow', type: 'state_large' },
    { name: 'Rajmata Vijayaraje Scindia Krishi Vishwa Vidyalaya', city: 'Gwalior', type: 'state_large' },
    { name: 'Mahatma Gandhi Chitrakoot Gramodaya Vishwavidyalaya', city: 'Chitrakoot', type: 'state_large' },
    { name: 'Indira Gandhi National Tribal University (Central University)', city: 'Amarkantak', type: 'central' },
    { name: 'A.K.S. University', city: 'Satna', type: 'tech_large' },
    { name: 'Abhyuday University', city: 'Khargone', type: 'tech_large' },
    { name: 'Amity University', city: 'Gwalior', type: 'tech_large' },
    { name: 'Aryavart University', city: 'Sehore', type: 'tech_large' },
    { name: 'Avantika University', city: 'Ujjain', type: 'tech_large' },
    { name: 'Bhabha University', city: 'Bhopal', type: 'tech_large' },
    { name: 'Chirayu University', city: 'Bhainsakhedi', type: 'medical_large' },
    { name: 'Dr. A.P.J. Abdul Kalam University', city: 'Indore', type: 'tech_large' },
    { name: 'Dr. Preeti Global University', city: 'Shivpuri', type: 'tech_large' },
    { name: 'Eklavya University', city: 'Damoh', type: 'tech_large' },
    { name: 'G.H. Raisoni University', city: 'Chhindwara', type: 'tech_large' },
    { name: 'Gyanodaya University', city: 'Neemuch', type: 'tech_large' },
    { name: 'Gyanveer University', city: 'Sagar', type: 'tech_large' },
    { name: 'ITM University', city: 'Gwalior', type: 'tech_large' },
    { name: 'I.E.S. University', city: 'Bhopal', type: 'tech_large' },
    { name: 'Jagran Lakecity University', city: 'Bhopal', type: 'tech_large' },
    { name: 'LNCT University', city: 'Bhopal', type: 'tech_large' },
    { name: 'Malwanchal University', city: 'Indore', type: 'medical_large' },
    { name: 'Mansarovar Global University', city: 'Sehore', type: 'tech_large' },
    { name: 'Mangalayatan University', city: 'Jabalpur', type: 'tech_large' },
    { name: 'Medi-Caps University', city: 'Indore', type: 'tech_large' },
    { name: 'Mandsaur University', city: 'Mandsaur', type: 'tech_large' },
    { name: 'Madhyanchal Professional University', city: 'Bhopal', type: 'tech_large' },
    { name: 'Patel College of Science & Technology (University Status)', city: 'Bhopal', type: 'tech_large' },
    { name: 'Raja Mansingh Tomar Music & Arts University', city: 'Gwalior', type: 'state_large' },
    { name: 'Sri Satya Sai University of Technology & Medical Sciences', city: 'Sehore', type: 'tech_large' },
    { name: 'Swami Vivekanand University', city: 'Sagar', type: 'tech_large' },
    { name: 'Symbiosis University of Applied Sciences', city: 'Indore', type: 'tech_large' },
    { name: 'Techno Global University', city: 'Vidisha', type: 'tech_large' },
    { name: 'VIT Bhopal University (part of VIT group)', city: 'Bhopal', type: 'tech_large' }
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
    ],
    central: [
        { name: 'B.Tech', semCount: 8, branches: ['Computer Science', 'IT'] },
        { name: 'B.A', semCount: 6, branches: ['History', 'Political Science'] },
        { name: 'M.A', semCount: 4, branches: ['Sociology', 'English'] }
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
    'B.A.': {
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
        console.log('--- RE-SEEDING WITH UNIVERSITY SPECIFIC OVERRIDES ---');

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
                description: `${uniData.name} located in ${uniData.city}, Madhya Pradesh.`,
                logo: '🏫'
            });

            const templates = uniData.type === 'specific' ? uniData.courses : (courseTemplates[uniData.type] || courseTemplates.state_large);

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

        console.log('--- DATABASE SUCCESSFULLY RE-SEEDED WITH OVERWRITTEN DATA ---');
        process.exit();
    } catch (e) {
        console.error('Seeding Error:', e);
        process.exit(1);
    }
};

seedData();
