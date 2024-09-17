export const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId) as HTMLElement; // Cast to HTMLElement
    if (element) {
        window.scrollTo({
            top: element.offsetTop-20,
            behavior: "smooth",
        });
    }
};

export const scroll_ = () => {
    const sections = document.querySelectorAll(".section");
    const navButtons = document.querySelectorAll(".nav button");
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id") || "";
        }
    });

    navButtons.forEach((button) => {
        button.classList.remove("current");
        const link = button.querySelector("a");
        if (link && link.getAttribute("href") === `#${current}`) {
            button.classList.add("current");
        }
    });
};