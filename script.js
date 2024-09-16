function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    } else {
        console.error(`Elemento con ID "${id}" no encontrado.`);
    }
}