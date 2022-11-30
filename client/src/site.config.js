const shared = {
    name: "Stardust",
    repo: "https://github.com/",
    website: "http://www.google.com",
    title: "Stardust - To the moon",
    description: "Everyone deserves",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGhCU_F7SNZy2gSffPHSibo-hfR0OWoiyDw&usqp=CAU",
};

const siteConfig = {
    name: shared.name,
    image: shared.image,
    type: "website",
    title: shared.title,
    titleTemplate: "%s - Stardust",
    description: shared.description,
    stats: {
        members: 100,
        commits: 2.1,
        projects: 25,
        workshops: 18,
    },
    newsletterUrl: "",
    siteUrl: shared.website,
    contacts: {
        instagram: "https://www.instagram.com/c",
        youtube: "https://www.youtube.com/",
        github: "https://github.com/",
        facebook: "https://www.facebook.com/",
        linkedin: "https://www.linkedin.com/",
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: shared.website,
        title: shared.title,
        site_name: shared.name,
        description: shared.description,
        images: [{
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGhCU_F7SNZy2gSffPHSibo-hfR0OWoiyDw&usqp=CAU",
            width: 1200,
            height: 630,
            alt: "Stardust - We Operate",
        }, ],
    },
};

export default siteConfig;