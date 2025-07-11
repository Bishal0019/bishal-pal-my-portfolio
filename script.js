{
    AOS.init({
        offse: 0,
        easing: 'ease-in-out'
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const toggles = document.querySelectorAll('.toggle-switch')
    const root = document.documentElement

    const savedTheme = localStorage.getItem('dark-mode') === 'true'  // true or false (as string)

    toggles.forEach(toggle => {
        toggle.checked = savedTheme // Set toggle position

        applyTheme(savedTheme)

        toggle.addEventListener('change', () => {
            const isDark = toggle.checked
            applyTheme(isDark)
            localStorage.setItem('dark-mode', isDark) // Save preference
        })
    })

    function applyTheme(isDark) {
        if (isDark) {
            root.style.setProperty('--mainBackground', 'hsl(0,0%,0%)')
            root.style.setProperty('--sectionBackground', 'hsl(0,0%,10%)')
            root.style.setProperty('--textHover', 'hsl(0,0%,100%)')
            root.style.setProperty('--navbar', 'hsla(0,0%,40%,0.9)')
            root.style.setProperty('--navOptions', 'hsl(0,0%,80%)')
            root.style.setProperty('--sidebar','hsla(0, 0%, 50%, 0.3)')
            root.style.setProperty('--buttonColor','hsl(0,0%,40%)')
            root.style.setProperty('--textColor','hsl(0,0%,70%)')
        } else {
            root.style.setProperty('--mainBackground', 'hsl(0,0%,95%)')
            root.style.setProperty('--sectionBackground', 'hsl(0,0%,100%)')
            root.style.setProperty('--textHover', 'hsl(0,0%,0%)')
            root.style.setProperty('--navbar', 'hsla(0,0%,80%,0.9)')
            root.style.setProperty('--navOptions', 'hsl(0,0%,50%)')
            root.style.setProperty('--sidebar','hsla(0,0%,0%,0.3)')
            root.style.setProperty('--buttonColor','hsl(0,0%,95%)')
            root.style.setProperty('--textColor','hsl(0,0%,40%)')
        }
    }
})


{
    document.addEventListener("DOMContentLoaded", () => {
        const menuCheckButton = document.getElementById('menu-button')
        const menuBar = document.getElementById('menu-bar')
        const line1 = document.getElementById('line1')
        const line2 = document.getElementById('line2')
        const line3 = document.getElementById('line3')
        const lines = document.querySelectorAll('.line')
        const menuWrapper = document.getElementById('menu-wrapper')
        const navButton = document.querySelector('.nav-button')

        menuCheckButton.addEventListener('change', () => {

            if (menuCheckButton.checked) {
                menuBar.style.right = '0'
                line2.style.transform = 'scaleX(0)'
                lines.forEach(element => {
                    element.style.position = 'absolute'
                });
                line1.style.transform = 'rotate(45deg)'
                line3.style.transform = 'rotate(-45deg)'
                menuWrapper.style.transform = 'rotate(180deg)'
            }
            else {
                menuBar.style.right = '-150px'
                line2.style.transform = 'scaleX(1)'
                lines.forEach(element => {
                    element.style.position = 'static'
                });
                line1.style.transform = 'rotate(0deg)'
                line3.style.transform = 'rotate(0deg)'
                menuWrapper.style.transform = 'rotate(0deg)'
            }
        })

        document.addEventListener('click', (e) => {
            const isInside = navButton.contains(e.target)
            if (!isInside && menuCheckButton.checked) {
                menuCheckButton.checked = false;
                menuCheckButton.dispatchEvent(new Event('change'))
            }
        })

        const links = document.querySelectorAll('a')
        links.forEach(element => {
            element.addEventListener('click', () => {
                if (menuCheckButton.checked) {
                    menuCheckButton.checked = false;
                    menuCheckButton.dispatchEvent(new Event('change'))
                }
            })
        });
    })
}

{
    document.addEventListener("DOMContentLoaded", () => {
        const projectToggles = document.querySelectorAll('.toggle')

        projectToggles.forEach((projectToggle) => {
            const projectContainer = projectToggle.querySelector('.project-container')
            let isVisible = false;

            projectToggle.addEventListener('click', (e) => {
                isVisible = !isVisible;
                projectToggle.classList.toggle('active')

                if (isVisible) {
                    projectToggle.style.minHeight = '400px'
                    setTimeout(() => {
                        projectContainer.style.display = 'flex'
                    }, 400);
                }
                else {
                    projectContainer.style.display = 'none'
                    setTimeout(() => {
                        projectToggle.style.minHeight = '80px'
                    }, 10);
                }
            })
        })
    })
}
