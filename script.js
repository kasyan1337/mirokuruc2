function randomChar() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
    return chars[Math.floor(Math.random() * chars.length)];
}

function generateRandomText(length) {
    return Array.from({length}, () => randomChar()).join("");
}

function animateText(element, targetText, callback) {
    let iterations = 0;
    const interval = setInterval(() => {
        element.innerText = targetText
            .split("")
            .map((char, index) => {
                if (index < iterations) return char;
                return randomChar();
            })
            .join("");
        if (iterations >= targetText.length) {
            clearInterval(interval);
            if (callback) callback();
        }
        iterations += 1;
    }, 50);
}

    document.querySelectorAll('.encrypted-text').forEach((el) => {
        const originalText = el.getAttribute('data-original');
        el.textContent = originalText;
        el.addEventListener('mouseenter', () => {
            animateText(el, generateRandomText(originalText.length));
        });
        el.addEventListener('mouseleave', () => {
            animateText(el, originalText);
        });
    });

    const download = document.getElementById('downloadLink');
    if (download) {
        download.addEventListener('click', function (e) {
            e.preventDefault();
            var fileUrl = this.href;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', fileUrl, true);
            xhr.responseType = 'blob';
            xhr.onload = function () {
                var blob = xhr.response;
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'Miro Kuruc (65C4EF4B) – Public PGP Key.asc';
                link.click();
            };
            xhr.send();
        });
    }

    const profilePicture = document.querySelector('.profile-picture img');
    if (profilePicture) {
        document.addEventListener('mousemove', (event) => {
            const {clientX, clientY} = event;
            const {left, top, width, height} = profilePicture.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            profilePicture.style.transform = `rotate(${angle}deg)`;
        });
        profilePicture.addEventListener('mouseleave', () => {
            profilePicture.style.transform = 'rotate(0deg)';
        });
    }

    const arrow = document.querySelector('.scroll-arrow');
    if (arrow) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                arrow.style.opacity = '0';
                arrow.style.bottom = '0px';
            } else {
                arrow.style.opacity = '1';
                arrow.style.bottom = '40px';
            }
        });
    }

function toggleList(listId) {
    var list = document.getElementById(listId);
    if (list) {
        if (list.style.display === 'none' || list.style.display === '') {
            list.style.display = 'block';
        } else {
            list.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const headings = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3');
    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = 'section-' + index;
        }
    });

    const tocList = document.querySelector('.contents-menu ul');
    if (tocList) {
        tocList.innerHTML = '';
        headings.forEach(heading => {
            const li = document.createElement('li');
            li.className = heading.tagName.toLowerCase();
            const link = document.createElement('a');
            link.href = '#' + heading.id;
            link.textContent = heading.textContent;

            link.addEventListener('click', function(e) {
                e.preventDefault();
                const rect = heading.getBoundingClientRect();
                const absoluteTop = window.pageYOffset + rect.top;
                const centerPosition = absoluteTop - (window.innerHeight / 2) + (rect.height / 2);
                window.scrollTo({ top: centerPosition, behavior: 'smooth' });
                document.querySelectorAll('.contents-menu li').forEach(item => item.classList.remove('active'));
                li.classList.add('active');
            });

            li.appendChild(link);
            tocList.appendChild(li);
        });
    }

    const trigger = document.querySelector('.contents-trigger');
    const menu = document.querySelector('.contents-menu');
    if (trigger && menu) {
        let hideTimeout;

        const showMenu = () => {
            clearTimeout(hideTimeout);
            menu.classList.add('visible');
        };

        const hideMenu = () => {
            hideTimeout = setTimeout(() => {
                menu.classList.remove('visible');
            }, 300);
        };

        trigger.addEventListener('mouseenter', showMenu);
        trigger.addEventListener('mouseleave', hideMenu);
        menu.addEventListener('mouseenter', showMenu);
        menu.addEventListener('mouseleave', hideMenu);
    }

    function updateReadingProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;
        const progressLine = document.querySelector('.progress-line');
        if (progressLine) {
            progressLine.style.height = `${scrolled}%`;
        }
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateReadingProgress);
    });

    updateReadingProgress();

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const windowHeight = window.innerHeight;
                const windowMiddle = window.pageYOffset + (windowHeight / 2);

                let closest = null;
                let closestDistance = Infinity;

                headings.forEach(heading => {
                    const rect = heading.getBoundingClientRect();
                    const absoluteTop = window.pageYOffset + rect.top;
                    const distance = Math.abs(absoluteTop - windowMiddle);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closest = heading;
                    }
                });

                if (closest) {
                    document.querySelectorAll('.contents-menu li').forEach(item => item.classList.remove('active'));
                    const activeLink = document.querySelector(`.contents-menu li a[href="#${closest.id}"]`);
                    if (activeLink) {
                        activeLink.parentElement.classList.add('active');
                    }
                }

                ticking = false;
            });

            ticking = true;
        }
    });
});
