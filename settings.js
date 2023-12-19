const instanceHost = 'i.peacht.art' // 인스턴스 주소 https:// 제외하고 입력
const instanceName = '피치타르트' // 인스턴스 이름
const themeColor = '#FF9899' // 인스턴스의 메인 색상
const githubUserName = 'jyhyun1008' // 레포지토리를 생성한 유저의 유저네임
const githubRepoName = 'addemojiform' // 레포지토리 이름
const adminId = ['9gsr4vuc01', '9gsrcnxa0g'] // 이모지 등록에 관여하거나, 알림을 받아야 하는 계정의 ID를 등록해주세요.

// 커스텀 폰트 등을 인스턴스와 맞추고 싶을 경우 이용할 수 있는 변수.. 잘못 사용하면 큰일납니당
const customCss = `
@import url('https://cdn.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css');
body, input, input::placeholder {font-family: Galmuri11;}
`

// 동의서
const ruleAgreement = '피치타르트의 <a href="https://i.peacht.art/@admin/pages/content-rule" target="_blank">커스텀 이모지 추가 안내서</a>를 읽었으며, 이에 동의합니다.' // 커스텀 이모지 관련 규정
const DmAgreement = '본 양식을 제출하게 되면 지금 로그인된 계정으로 피치타르트 관리계정 <a href="https://i.peacht.art/@admin" target="_blank">@admin@i.peacht.art</a> 에게 다이렉트 메시지가 전송되는 것을 이해했으며, 이에 동의합니다.' // 디엠 전송 동의

// 디엠 양식
const directMessage = '☺️ 다음과 같이 커스텀 이모지 등록을 신청합니다!\n- 주소: `'+emojiUrl.value+'`\n- 이름: `'+emojiName.value+'`\n- 분류: `'+emojiCategory.value+'`\n- 태그: `'+emojiTag.value+'`\n'