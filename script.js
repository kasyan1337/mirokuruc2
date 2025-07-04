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
    const progressBar = document.querySelector('.progress-bar');
    const tocList = document.querySelector('.toc ul');

    if (tocList) {
        const headings = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3');
        headings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = 'section-' + index;
            }
            const li = document.createElement('li');
            li.classList.add('toc-' + heading.tagName.toLowerCase());
            const a = document.createElement('a');
            a.href = '#' + heading.id;
            a.textContent = heading.textContent;
            a.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.getElementById(heading.id);
                const yOffset = -80;
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            });
            li.appendChild(a);
            tocList.appendChild(li);
        });
    }

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        if (progressBar) {
            progressBar.style.height = scrolled + '%';
        }
    }

    if (progressBar) {
        document.addEventListener('scroll', updateProgress);
        updateProgress();
    }
});
