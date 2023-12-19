var cssRoot = document.querySelector(':root');
cssRoot.style.setProperty('--accent', themeColor);

const head = document.head || document.getElementsByTagName('head')[0]
var style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet){
  // This is required for IE8 and below.
  style.styleSheet.cssText = customCss;
} else {
  style.appendChild(document.createTextNode(customCss));
}

const token = localStorage.getItem("token");
const signedusername = localStorage.getItem("username");

function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

var qs = getQueryStringObject();
var page = qs.p;

var isLogin = false;

if (!page) {
    if (token) {
        document.querySelector('#page_title').innerText = instanceName+' 커스텀 이모지 등록 신청서'
        document.querySelector('#page_content').innerHTML += '<div id="emojiform"><label for="emojiUrl">이미지 주소:</label><input id="emojiUrl" placeholder="https://~~~.png"></input><label for="emojiName">이름:</label><input id="emojiName" placeholder="영문 소문자와 숫자, 언더바(_)만 포함해주세요"></input><label for="emojiCategory">카테고리:</label><input id="emojiCategory" placeholder="장르 관련일 경우 제목 및 분류(애니, 게임 등)를 적어주세요."></input><label for="emojiTag">태그:</label><input id="emojiTag" placeholder="한글 위주로 작성해주세요. 공백으로 구분되며, 몇 가지 특수문자를 포함할 수 있습니다. 장르명, 캐릭터명도 함께 적어주세요."></input><div class="check"><input type="checkbox" name="checkBox" id="checkBox" /><label for="checkBox">'+ruleAgreement+'</label></div><div class="check"><input type="checkbox" name="checkBox2" id="checkBox2" /><label for="checkBox2">'+DmAgreement+'</label></div><div class="button" id="submit">제출</div></div>'
        
        var emojiUrl = document.querySelector('#emojiUrl')
        var emojiName = document.querySelector('#emojiName')
        var emojiCategory = document.querySelector('#emojiCategory')
        var emojiTag = document.querySelector('#emojiTag')
        var checkBox = document.querySelector('#checkBox')
        var checkBox2 = document.querySelector('#checkBox2')

        const nameRegex = /^[0-9a-z_]+$/

        document.querySelector('#submit').addEventListener('click', function(e) {
            if (emojiUrl.value == '') {
                alert('이미지 주소를 입력하세요!')
            } else if (emojiName.value == '') {
                alert('이름을 입력하세요!')
            } else if (emojiCategory.value == '') {
                alert('카테고리를 입력하세요!')
            } else if (nameRegex.test(emojiName.value) !== true) {
                alert('이모지 이름이 형식에 맞는지 확인해주세요.')
            } else if (emojiTag.value.split(' ').length == 0) {
                alert('태그를 하나 이상 입력하세요!')
            } else if (!checkBox.checked || !checkBox2.checked) {
                alert('체크박스 항목에 동의하셔야만 양식 제출이 가능합니다.')
            } else {
                const createNoteURL = 'https://' + instanceHost + '/api/notes/create'
                const createNoteParam = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        i: token,
                        visibility: 'specified',
                        cw: '커스텀 이모지 등록 신청',
                        visibleUserIds: ['9gsr4vuc01'],
                        text: '다음과 같이 커스텀 이모지 등록을 신청합니다.\n- emojiUrl: `'+emojiUrl.value+'`\n- emojiName: `'+emojiName.value+'`\n- emojiCategory: `'+emojiCategory.value+'`\n- emojiTag: `'+emojiTag.value+'`\n'
                    })
                }
                fetch(createNoteURL, createNoteParam)
                .then((noteData) => {return noteData.json()})
                .then((noteRes) => {
                    location.href = location.origin + '?p=done'
                })
            }
        })
    } else {
        document.querySelector('#page_title').innerText = instanceName+' 커스텀 이모지 등록 신청서 - 로그인'
        document.querySelector('#page_content').innerHTML += '<div id="signinform"><div>로그인이 필요합니다.</div><div>'+instanceName+' 아이디로 로그인할 수 있습니다.</div><div class="button" id="signin">로그인</div></div>'
        document.querySelector('#signin').addEventListener('click', function(e) {
            let uuid = self.crypto.randomUUID();
            localStorage.setItem("sessionId", uuid);
            var signinUrl = 'https://'+instanceHost+'/miauth/'+uuid+'?name=EmojiForm&callback=https%3A%2F%2F'+githubUserName+'.github.io%2F'+githubRepoName+'%3Fp%3Dcallback&permission=write:notes'
            location.href = signinUrl;
        })
    }
} else if (page == 'callback') {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
        var postUrl = 'https://'+instanceHost+'/api/miauth/'+sessionId+'/check'
        var postParam = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({})
        }
        fetch(postUrl, postParam)
        .then((tokenData) => {return tokenData.json()})
        .then((tokenRes) => {
            localStorage.setItem("token", tokenRes.token)
            localStorage.setItem("username", tokenRes.user.username)
            localStorage.setItem("userid", tokenRes.user.id)

            location.href = location.origin
        })
        .catch(err => {throw err});
    }
} else if (page == 'done') {
    document.querySelector('#page_title').innerText = instanceName+' 커스텀 이모지 등록 신청 완료'
    document.querySelector('#page_content').innerHTML += '<div id="signinform">커스텀 이모지 등록 신청이 잘 완료되었습니다.</div>'
}