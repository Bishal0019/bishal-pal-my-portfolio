{
    document.addEventListener("DOMContentLoaded", () => {
        const menuCheckButton = document.getElementById('menu-button')
        const menuBar = document.getElementById('menu-bar')
        const line1 = document.getElementById('line1')
        const line2 = document.getElementById('line2')
        const line3 = document.getElementById('line3')
        const lines = document.querySelectorAll('.line')
        const menuWrapper = document.getElementById('menu-wrapper')

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
    })
}