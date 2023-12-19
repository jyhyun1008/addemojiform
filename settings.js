const instanceHost = 'i.peacht.art' // 인스턴스 주소 https:// 제외하고 입력
const instanceName = '피치타르트' // 인스턴스 이름
const themeColor = '#FF9899' // 인스턴스의 메인 색상
const githubUserName = 'jyhyun1008' // 레포지토리를 생성한 유저의 유저네임
const githubRepoName = 'addemojiform' // 레포지토리 이름

// 커스텀 폰트 등을 인스턴스와 맞추고 싶을 경우 이용할 수 있는 변수.. 잘못 사용하면 큰일납니당
const customCss = `
@import url('https://cdn.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css');
body, input::placeholder {font-family: Galmuri11;}
`

// 동의서
const ruleAgreement = '피치타르트의 <a href="https://i.peacht.art/@admin/pages/content-rule" target="_blank">커스텀 이모지 추가 안내서</a>를 읽었으며, 이에 동의합니다.' // 커스텀 이모지 관련 규정
const DmAgreement = '본 양식을 제출하게 되면 지금 로그인된 계정으로 피치타르트 관리계정 <a href="https://i.peacht.art/@admin" target="_blank">@admin@i.peacht.art</a> 에게 다이렉트 메시지가 전송되는 것을 이해했으며, 이에 동의합니다.' // 디엠 전송 동의