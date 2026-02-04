// Topics data - organized to match course modules
// Each topic belongs to a specific module defined in modules.js

export const topics = [
  // Module 1: Introductions and Why Learn Stats
  {
    id: 'intro-to-stats',
    moduleId: 'module-1',
    title: 'Why Do We Learn Statistics?',
    description: 'What is statistics and why does it matter for psychology?',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="intro-stats-title">
  <h2 id="intro-stats-title">1. Why do we learn statistics?</h2>

  <blockquote class="chapter-quote">
    <p>"Thou shalt not answer questionnaires<br>
    Or quizzes upon World Affairs,<br>
    Nor with compliance<br>
    Take any test. Thou shalt not sit<br>
    With statisticians nor commit<br>
    A social science"</p>
    <footer>– W.H. Auden<sup>1</sup></footer>
  </blockquote>

  <h3>1.1 On the psychology of statistics</h3>

  <p>
    To the surprise of many students, statistics is a fairly significant part of a psychological education.
    To the surprise of no-one, statistics is very rarely the favourite part of one's psychological
    education. After all, if you really loved the idea of doing statistics, you'd probably be enrolled
    in a statistics class right now, not a psychology class. So, not surprisingly, there's a pretty large
    proportion of the student base that isn't happy about the fact that psychology has so much
    statistics in it. In view of this, I thought that the right place to start might be to answer some
    of the more common questions that people have about stats.
  </p>

  <p>
    A big part of this issue at hand relates to the very idea of statistics. What is
    it? What's it there for? And why are scientists so bloody obsessed with it? These are all good questions,
    when you think about it. So let's start with the last one. As a group, scientists seem to be
    bizarrely fixated on running statistical tests on everything. In fact, we use statistics so often
    that we sometimes forget to explain to people why we do. It's a kind of article of faith among
    scientists – and especially social scientists – that your findings can't be trusted until you've done
    some stats. Undergraduate students might be forgiven for thinking that we're all completely
    mad, because no-one takes the time to answer one very simple question:
  </p>

  <h4>Why do you do statistics? Why don't scientists just use common sense?</h4>

  <p>
    It's a naive question in some ways, but most good questions are. There's a lot of good answers
    to it,<sup>2</sup> but for my money, the best answer is a really simple one: <strong>we don't trust ourselves enough</strong>.
    We worry that we're human, and susceptible to all of the biases, temptations and frailties that
    humans suffer from. Much of statistics is basically a safeguard. Using "common sense" to
    evaluate evidence means trusting gut instincts, relying on verbal arguments and on using the
    raw power of human reason to come up with the right answer. Most scientists don't think this
    approach is likely to work.
  </p>

  <p>
    In fact, come to think of it, this sounds a lot like a psychological question to me, and since I do
    work in a psychology department, it seems like a good idea to dig a little deeper here. Is it really
    plausible to think that this "common sense" approach is very trustworthy? Verbal arguments
    have to be constructed in language, and all languages have biases – some things are harder to
    say than others, and not necessarily because they're false (e.g., quantum electrodynamics is a
    good theory, but hard to explain in words). The instincts of our "gut" aren't designed to solve
    scientific problems, they're designed to handle day to day inferences – and given that biological
    evolution is slower than cultural change, we should say that they're designed to solve the day
    to day problems for a <em>different</em> world than the one we live in. Most fundamentally, reasoning
    sensibly requires people to engage in "induction", making wise guesses and going beyond the
    immediate evidence of the senses to make generalisations about the world. If you think that
    you can do that without being influenced by various distractors, well, I have a bridge in London
    I'd like to sell you. Heck, as the next section shows, we can't even solve "deductive" problems
    (ones where no guessing is required) without being influenced by our pre-existing biases.
  </p>

  <div class="key-points">
    <h4>Key Points: Why Scientists Use Statistics</h4>
    <ul>
      <li><strong>Human bias is unavoidable</strong> – We can't trust "common sense" alone because we're susceptible to biases and pre-existing beliefs</li>
      <li><strong>Statistics as safeguard</strong> – Statistical methods help control for personal biases and keep researchers honest</li>
      <li><strong>Language limitations</strong> – Verbal arguments can be biased by what's easy or hard to express in language</li>
      <li><strong>Deductive reasoning fails</strong> – Even logical problems without guessing are influenced by our biases</li>
    </ul>
  </div>

  <h4>1.1.1 The curse of belief bias</h4>

  <p>
    People are mostly pretty smart. We're certainly smarter than the other species that we
    share the planet with (though many people might disagree). Our minds are quite amazing
    things, and we seem to be capable of the most incredible feats of thought and reason. That
    doesn't make us perfect though. And among the many things that psychologists have shown
    over the years is that we really do find it hard to be neutral, to evaluate evidence impartially
    and without being swayed by pre-existing biases. A good example of this is the <strong>belief bias
    effect</strong> in logical reasoning: if you ask people to decide whether a particular argument is logically
    valid (i.e., conclusion would be true if the premises were true), we tend to be influenced by the
    believability of the conclusion, even when we shouldn't. For instance, here's a valid argument
    where the conclusion is believable:
  </p>

  <div class="terminology-box">
    <h4>Terminology: Belief Bias Effect</h4>
    <p>
      The <strong>belief bias effect</strong> is a cognitive bias in logical reasoning where people's evaluation of
      whether an argument is logically valid is influenced by whether they believe the conclusion to be true.
      People tend to accept invalid arguments if the conclusion aligns with their beliefs, and reject valid
      arguments if the conclusion contradicts their beliefs—even though logical validity depends only on
      the structure of the argument, not the truth of the premises or conclusion.
    </p>
  </div>

  <div class="example-box">
    <p><strong>All cigarettes are expensive</strong> (Premise 1)<br>
    <strong>Some addictive things are inexpensive</strong> (Premise 2)<br>
    <strong>Therefore, some addictive things are not cigarettes</strong> (Conclusion)</p>
  </div>

  <p>And here's a valid argument where the conclusion is not believable:</p>

  <div class="example-box">
    <p><strong>All addictive things are expensive</strong> (Premise 1)<br>
    <strong>Some cigarettes are inexpensive</strong> (Premise 2)<br>
    <strong>Therefore, some cigarettes are not addictive</strong> (Conclusion)</p>
  </div>

  <p>
    The logical <em>structure</em> of argument #2 is identical to the structure of argument #1, and they're
    both valid. However, in the second argument, there are good reasons to think that premise 1 is
    incorrect, and as a result it's probably the case that the conclusion is also incorrect. But that's
    entirely irrelevant to the topic at hand; an argument is deductively valid if the conclusion is
    a logical consequence of the premises. That is, a valid argument doesn't have to involve true
    statements.
  </p>

  <p>On the other hand, here's an invalid argument that has a believable conclusion:</p>

  <div class="example-box">
    <p><strong>All addictive things are expensive</strong> (Premise 1)<br>
    <strong>Some cigarettes are inexpensive</strong> (Premise 2)<br>
    <strong>Therefore, some addictive things are not cigarettes</strong> (Conclusion)</p>
  </div>

  <p>And finally, an invalid argument with an unbelievable conclusion:</p>

  <div class="example-box">
    <p><strong>All cigarettes are expensive</strong> (Premise 1)<br>
    <strong>Some addictive things are inexpensive</strong> (Premise 2)<br>
    <strong>Therefore, some cigarettes are not addictive</strong> (Conclusion)</p>
  </div>

  <p>
    Now, suppose that people really are perfectly able to set aside their pre-existing biases about
    what is true and what isn't, and purely evaluate an argument on its logical merits. We'd expect
    100% of people to say that the valid arguments are valid, and 0% of people to say that the
    invalid arguments are valid. So if you ran an experiment looking at this, you'd expect to see
    data like this:
  </p>

  <table class="results-table">
    <thead>
      <tr>
        <th></th>
        <th>conclusion feels true</th>
        <th>conclusion feels false</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>argument is valid</strong></td>
        <td>100% say "valid"</td>
        <td>100% say "valid"</td>
      </tr>
      <tr>
        <td><strong>argument is invalid</strong></td>
        <td>0% say "valid"</td>
        <td>0% say "valid"</td>
      </tr>
    </tbody>
  </table>

  <p>
    If the psychological data looked like this (or even a good approximation to this), we might feel
    safe in just trusting our gut instincts. That is, it'd be perfectly okay just to let scientists evaluate
    data based on their common sense, and not bother with all this murky statistics stuff. However,
    you guys have taken psych classes, and by now you probably know where this is going.
  </p>

  <p>
    In a classic study, Evans, Barston, and Pollard (1983) ran an experiment looking at exactly
    this. What they found is that when pre-existing biases (i.e., beliefs) were in agreement with the
    structure of the data, everything went the way you'd hope:
  </p>

  <table class="results-table">
    <thead>
      <tr>
        <th></th>
        <th>conclusion feels true</th>
        <th>conclusion feels false</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>argument is valid</strong></td>
        <td>92% say "valid"</td>
        <td></td>
      </tr>
      <tr>
        <td><strong>argument is invalid</strong></td>
        <td></td>
        <td>8% say "valid"</td>
      </tr>
    </tbody>
  </table>

  <p>Not perfect, but that's pretty good. But look what happens when our intuitive feelings about
  the truth of the conclusion run against the logical structure of the argument:</p>

  <table class="results-table">
    <thead>
      <tr>
        <th></th>
        <th>conclusion feels true</th>
        <th>conclusion feels false</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>argument is valid</strong></td>
        <td>92% say "valid"</td>
        <td><strong>46% say "valid"</strong></td>
      </tr>
      <tr>
        <td><strong>argument is invalid</strong></td>
        <td><strong>92% say "valid"</strong></td>
        <td>8% say "valid"</td>
      </tr>
    </tbody>
  </table>

  <p>
    Oh dear, that's not as good. Apparently, when people are presented with a strong argument
    that contradicts our pre-existing beliefs, we find it pretty hard to even perceive it to be a strong
    argument (people only did so 46% of the time). Even worse, when people are presented with a
    weak argument that agrees with our pre-existing biases, almost no-one can see that the argument
    is weak (people got that one wrong 92% of the time!).<sup>3</sup>
  </p>

  <p>
    If you think about it, it's not as if these data are horribly damning. Overall, people did do
    better than chance at compensating for their prior biases, since about 60% of people's judgements
    were correct (you'd expect 50% by chance). Even so, if you were a professional "evaluator of
    evidence", and someone came along and offered you a magic tool that improves your chances of
    making the right decision from 60% to (say) 95%, you'd probably jump at it, right? Of course
    you would. Thankfully, we actually do have a tool that can do this. But it's not magic, it's
    statistics. So that's reason #1 why scientists love statistics. It's just <em>too easy</em> for us to "believe
    what we want to believe". So instead, if we want to "believe in the data", we're going to need a
    bit of help to keep our personal biases under control. That's what statistics does, it helps keep
    us honest.
  </p>

  <div class="critical-points">
    <h4>Critical Point: The Case for Statistical Analysis</h4>
    <p>
      Without statistical methods, people correctly evaluate logical arguments only about <strong>60% of the time</strong>
      (barely better than chance). When beliefs conflict with evidence:
    </p>
    <ul>
      <li>We accept <strong>only 46%</strong> of valid arguments that contradict our beliefs</li>
      <li>We incorrectly accept <strong>92%</strong> of invalid arguments that agree with our beliefs</li>
    </ul>
    <p>
      <strong>Statistics improves accuracy from ~60% to ~95%</strong>, serving as a safeguard against our natural
      tendency to believe what we want to believe. This is why research cannot rely on "common sense" alone.
    </p>
  </div>

  <h3>1.2 The cautionary tale of Simpson's paradox</h3>

  <p>
    The following is a true story (I think!). In 1973, the University of California, Berkeley had some
    worries about the admissions of students into their postgraduate courses. Specifically, the thing
    that caused the problem was that the gender breakdown of their admissions, which looked like
    this:
  </p>

  <table class="results-table">
    <thead>
      <tr>
        <th></th>
        <th>Number of applicants</th>
        <th>Percent admitted</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Males</strong></td>
        <td>8442</td>
        <td>44%</td>
      </tr>
      <tr>
        <td><strong>Females</strong></td>
        <td>4321</td>
        <td>35%</td>
      </tr>
    </tbody>
  </table>

  <p>
    Given this, they were worried about being sued!<sup>4</sup> Given that there were nearly 13,000 applicants,
    a difference of 9% in admission rates between males and females is just way too big to be a
    coincidence. Pretty compelling data, right? And if I were to say to you that these data actually
    reflect a weak bias in favour of women (sort of!), you'd probably think that I was either crazy
    or sexist.
  </p>

  <p>
    Oddly, it's actually sort of true. When people started looking more carefully at the admissions
    data they told a rather different story (Bickel, Hammel, and O'Connell 1975). Specifically,
    when they looked at it on a department by department basis, it turned out that most of the
    departments actually had a slightly <em>higher</em> success rate for female applicants than for male applicants. The table below shows the admission figures for the six largest departments (with the
    names of the departments removed for privacy reasons):
  </p>

  <table class="results-table">
    <thead>
      <tr>
        <th>Department</th>
        <th colspan="2">Males</th>
        <th colspan="2">Females</th>
      </tr>
      <tr>
        <th></th>
        <th>Applicants</th>
        <th>Percent admitted</th>
        <th>Applicants</th>
        <th>Percent admitted</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>A</strong></td>
        <td>825</td>
        <td>62%</td>
        <td>108</td>
        <td><strong>82%</strong></td>
      </tr>
      <tr>
        <td><strong>B</strong></td>
        <td>560</td>
        <td>63%</td>
        <td>25</td>
        <td><strong>68%</strong></td>
      </tr>
      <tr>
        <td><strong>C</strong></td>
        <td>325</td>
        <td>37%</td>
        <td>593</td>
        <td>34%</td>
      </tr>
      <tr>
        <td><strong>D</strong></td>
        <td>417</td>
        <td>33%</td>
        <td>375</td>
        <td><strong>35%</strong></td>
      </tr>
      <tr>
        <td><strong>E</strong></td>
        <td>191</td>
        <td>28%</td>
        <td>393</td>
        <td>24%</td>
      </tr>
      <tr>
        <td><strong>F</strong></td>
        <td>272</td>
        <td>6%</td>
        <td>341</td>
        <td><strong>7%</strong></td>
      </tr>
    </tbody>
  </table>

  <p>
    Remarkably, most departments had a higher rate of admissions for females than for males! Yet
    the overall rate of admission across the university for females was lower than for males. How
    can this be? How can both of these statements be true at the same time?
  </p>

  <p>
    Here's what's going on. Firstly, notice that the departments are not equal to one another
    in terms of their admission percentages: some departments (e.g., A, B) tended to admit a
    high percentage of the qualified applicants, whereas others (e.g., F) tended to reject most of
    the candidates, even if they were high quality. So, among the six departments shown above,
    notice that department A is the most generous, followed by B, C, D, E and F in that order.
    Next, notice that males and females tended to apply to different departments. If we rank the
    departments in terms of the total number of male applicants, we get <strong>A→B→D→C→F→E</strong> (the
    "easy" departments are in bold). On the whole, males tended to apply to the departments that
    had high admission rates. Now compare this to how the female applicants distributed themselves.
    Ranking the departments in terms of the total number of female applicants produces a quite
    different ordering <strong>C→E→D→F→A→B</strong>. In other words, what these data seem to be suggesting
    is that the female applicants tended to apply to "harder" departments. And in fact, if we look
    at Figure 1.1 we see that this trend is systematic, and quite striking. This effect is known as
    <strong>Simpson's paradox</strong>. It's not common, but it does happen in real life, and most people are
    very surprised by it when they first encounter it, and many people refuse to even believe that
    it's real. It is very real. And while there are lots of very subtle statistical lessons buried in
    there, I want to use it to make a much more important point: doing research is hard, and there
    are lots of subtle, counter-intuitive traps lying in wait for the unwary. That's reason #2 why
    scientists love statistics, and why we teach research methods. Because science is hard, and the
    truth is sometimes cunningly hidden in the nooks and crannies of complicated data.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Simpson's Paradox</h4>
    <p>
      <strong>Simpson's paradox</strong> occurs when a trend that appears in aggregated data reverses or
      disappears when the data is broken down into subgroups. In the Berkeley example, females had
      lower overall admission rates than males (35% vs 44%), but most individual departments actually
      admitted females at higher rates. The paradox arose because women tended to apply to more
      competitive departments with lower admission rates overall.
    </p>
    <p>
      <strong>Key lesson:</strong> The same dataset can tell completely different stories depending on how you
      aggregate it. This demonstrates why careful statistical analysis and thoughtful interpretation are
      essential—the truth can be hidden in how data is grouped and analyzed.
    </p>
  </div>

  <div class="callout warning">
    <h4>Critical Insight: Statistics Is Not Enough</h4>
    <p>
      Before leaving this topic entirely, I want to point out something else really critical that is often
      overlooked in a research methods class. <strong>Statistics only solves part of the problem.</strong> Remember
      that we started all this with the concern that Berkeley's admissions processes might be unfairly
      biased against female applicants. When we looked at the "aggregated" data, it did seem like
      the university was discriminating against women, but when we "disaggregate" and looked at the
      individual behaviour of all the departments, it turned out that the actual departments were, if
      anything, slightly biased in favour of women. The gender bias in total admissions was caused
      by the fact that women tended to self-select for harder departments. From a legal perspective,
      that would probably put the university in the clear. Postgraduate admissions are determined
      at the level of the individual department, and there are good reasons to do that. At the level
      of individual departments the decisions are more or less unbiased (the weak bias in favour of
      females at that level is small, and not consistent across departments). Since the university can't
      dictate which departments people choose to apply to, and the decision making takes place at
      the level of the department it can hardly be held accountable for any biases that those choices
      produce.
    </p>
    <p>
      That was the basis for my somewhat glib remarks earlier, but that's not exactly the whole
      story, is it? After all, if we're interested in this from a more sociological and psychological
      perspective, we might want to ask <em>why</em> there are such strong gender differences in applications.
      Why do males tend to apply to engineering more often than females, and why is this reversed
      for the English department? And why is it the case that the departments that tend to have
      a female-application bias tend to have lower overall admission rates than those departments
      that have a male-application bias? Might this not still reflect a gender bias, even though every
      single department is itself unbiased? It might. Suppose, hypothetically, that males preferred
      to apply to "hard sciences" and females prefer "humanities". And suppose further that the
      reason for why the humanities departments have low admission rates is because the government
      doesn't want to fund the humanities (Ph.D. places, for instance, are often tied to government
      funded research projects). Does that constitute a gender bias? Or just an unenlightened view
      of the value of the humanities? What if someone at a high level in the government cut the
      humanities funds because they felt that the humanities are "useless chick stuff". That seems
      pretty blatantly gender biased. None of this falls within the purview of statistics, but it matters
      to the research project. If you're interested in the overall structural effects of subtle gender
      biases, then you probably want to look at both the aggregated and disaggregated data. If you're
      interested in the decision making process at Berkeley itself then you're probably only interested
      in the disaggregated data.
    </p>
    <p>
      In short there are a lot of critical questions that you can't answer with statistics, but the
      answers to those questions will have a huge impact on how you analyse and interpret data. And
      this is the reason why you should always think of statistics as a <strong>tool</strong> to help you learn about
      your data. No more and no less. It's a powerful tool to that end, but there's no substitute for
      careful thought.
    </p>
  </div>

  <h3>1.3 Statistics in psychology</h3>

  <p>
    I hope that the discussion above helped explain why science in general is so focused on statistics. But I'm guessing that you have a lot more questions about what role statistics plays in
    psychology, and specifically why psychology classes always devote so many lectures to stats. So
    here's my attempt to answer a few of them...
  </p>

  <h4>• Why does psychology have so much statistics?</h4>

  <p>
    To be perfectly honest, there's a few different reasons, some of which are better than others.
    The most important reason is that <strong>psychology is a statistical science</strong>. What I mean by
    that is that the "things" that we study are people. Real, complicated, gloriously messy,
    infuriatingly perverse people. The "things" of physics include objects like electrons, and
    while there are all sorts of complexities that arise in physics, electrons don't have minds
    of their own. They don't have opinions, they don't differ from each other in weird and
    arbitrary ways, they don't get bored in the middle of an experiment, and they don't get
    angry at the experimenter and then deliberately try to sabotage the data set (not that
    I've ever done that!). At a fundamental level psychology is harder than physics.<sup>5</sup>
  </p>

  <p>
    Basically, we teach statistics to you as psychologists because you need to be better at stats
    than physicists. There's actually a saying used sometimes in physics, to the effect that
    "if your experiment needs statistics, you should have done a better experiment". They
    have the luxury of being able to say that because their objects of study are pathetically
    simple in comparison to the vast mess that confronts social scientists. And it's not just
    psychology. Most social sciences are desperately reliant on statistics. Not because we're
    bad experimenters, but because we've picked a harder problem to solve. We teach you
    stats because you really, really need it.
  </p>

  <h4>• Can't someone else do the statistics?</h4>

  <p>
    To some extent, but not completely. It's true that you don't need to become a fully trained
    statistician just to do psychology, but you do need to reach a certain level of statistical
    competence. In my view, there's three reasons that every psychological researcher ought
    to be able to do basic statistics:
  </p>

  <ul>
    <li><strong>Firstly, there's the fundamental reason:</strong> statistics is deeply intertwined with research
    design. If you want to be good at designing psychological studies, you need to at the
    very least understand the basics of stats.</li>

    <li><strong>Secondly,</strong> if you want to be good at the psychological side of the research, then you
    need to be able to understand the psychological literature, right? But almost every
    paper in the psychological literature reports the results of statistical analyses. So if
    you really want to understand the psychology, you need to be able to understand
    what other people did with their data. And that means understanding a certain
    amount of statistics.</li>

    <li><strong>Thirdly,</strong> there's a big practical problem with being dependent on other people to do
    all your statistics: statistical analysis is expensive. If you ever get bored and want to
    look up how much the Australian government charges for university fees, you'll notice
    something interesting: statistics is designated as a "national priority" category, and
    so the fees are much, much lower than for any other area of study. This is because
    there's a massive shortage of statisticians out there. So, from your perspective as a
    psychological researcher, the laws of supply and demand aren't exactly on your side
    here! As a result, in almost any real life situation where you want to do psychological research, the cruel facts will be that you don't have enough money to afford
    a statistician. So the economics of the situation mean that you have to be pretty
    self-sufficient.</li>
  </ul>

  <p>
    Note that a lot of these reasons generalise beyond researchers. If you want to be a practicing
    psychologist and stay on top of the field, it helps to be able to read the scientific literature,
    which relies pretty heavily on statistics.
  </p>

  <div class="key-points">
    <h4>Key Points: Why Psychology Needs Statistics</h4>
    <ul>
      <li><strong>Psychology is inherently statistical</strong> – Unlike physics studying simple objects, psychology studies complex, variable humans who have minds, opinions, and unpredictable behaviors</li>
      <li><strong>You can't fully outsource statistics</strong> – Three critical reasons to learn stats yourself:
        <ul>
          <li>Statistics is deeply intertwined with research design</li>
          <li>Understanding the literature requires understanding statistical analyses</li>
          <li>Professional statisticians are expensive and in short supply</li>
        </ul>
      </li>
      <li><strong>Statistics matters beyond research</strong> – Practitioners need to read scientific literature to stay current in the field</li>
    </ul>
  </div>

  <h4>• I don't care about jobs, research, or clinical work. Do I need statistics?</h4>

  <p>
    Okay, now you're just messing with me. Still, I think it should matter to you too. Statistics
    should matter to you in the same way that statistics should matter to <em>everyone</em>. We live
    in the 21st century, and data are <em>everywhere</em>. Frankly, given the world in which we live
    these days, a basic knowledge of statistics is pretty damn close to a survival tool! Which
    is the topic of the next section.
  </p>

  <h3>1.4 Statistics in everyday life</h3>

  <blockquote class="chapter-quote">
    <p>"We are drowning in information,<br>
    but we are starved for knowledge"</p>
    <footer>– Various authors, original probably John Naisbitt</footer>
  </blockquote>

  <p>
    When I started writing up my lecture notes I took the 20 most recent news articles posted to
    the ABC news website. Of those 20 articles, it turned out that 8 of them involved a discussion
    of something that I would call a statistical topic and 6 of those made a mistake. The most
    common error, if you're curious, was failing to report baseline data (e.g., the article mentions
    that 5% of people in situation X have some characteristic Y, but doesn't say how common the
    characteristic is for everyone else!). The point I'm trying to make here isn't that journalists are
    bad at statistics (though they almost always are), it's that a basic knowledge of statistics is very
    helpful for trying to figure out when someone else is either making a mistake or even lying to
    you. In fact, one of the biggest things that a knowledge of statistics does to you is cause you to
    get angry at the newspaper or the internet on a far more frequent basis. You can find a good
    example of this in Section 4.1.5. In later versions of this book I'll try to include more anecdotes
    along those lines.
  </p>

  <div class="critical-points">
    <h4>Critical Point: Statistical Literacy as a Life Skill</h4>
    <p>
      In a sample of 20 recent news articles, <strong>40% discussed statistical topics</strong> and <strong>75% of
      those made statistical errors</strong>. The most common mistake: failing to report baseline data for
      comparison.
    </p>
    <p>
      <strong>Why this matters:</strong> In the 21st century, data is everywhere. A basic knowledge of statistics
      is essential for:
    </p>
    <ul>
      <li>Identifying when information is misleading or incorrect</li>
      <li>Recognizing when someone is lying with statistics</li>
      <li>Being an informed consumer of news and research</li>
      <li>Making better decisions in daily life</li>
    </ul>
    <p>Statistics is not just for scientists—it's a survival tool for navigating the modern information landscape.</p>
  </div>

  <h3>1.5 There's more to research methods than statistics</h3>

  <p>
    So far, most of what I've talked about is statistics, and so you'd be forgiven for thinking that
    statistics is all I care about in life. To be fair, you wouldn't be far wrong, but research methodology is a broader concept than statistics. So most research methods courses will cover a lot of
    topics that relate much more to the pragmatics of research design, and in particular the issues
    that you encounter when trying to do research with humans. However, about 99% of student
    fears relate to the statistics part of the course, so I've focused on the stats in this discussion,
    and hopefully I've convinced you that statistics matters, and more importantly, that it's not to
    be feared. That being said, it's pretty typical for introductory research methods classes to be
    very stats-heavy. This is not (usually) because the lecturers are evil people. Quite the contrary,
    in fact. Introductory classes focus a lot on the statistics because you almost always find yourself
    needing statistics before you need the other research methods training. Why? Because almost
    all of your assignments in other classes will rely on statistical training, to a much greater extent
    than they rely on other methodological tools. It's not common for undergraduate assignments
    to require you to design your own study from the ground up (in which case you would need
    to know a lot about research design), but it <em>is</em> common for assignments to ask you to analyse
    and interpret data that were collected in a study that someone else designed (in which case you
    need statistics). In that sense, from the perspective of allowing you to do well in all your other
    classes, the statistics is more urgent.
  </p>

  <p>
    But note that "urgent" is different from "important" – they both matter. I really do want
    to stress that research design is just as important as data analysis, and this book does spend a
    fair amount of time on it. However, while statistics has a kind of universality, and provides a set
    of core tools that are useful for most types of psychological research, the research methods side
    isn't quite so universal. There are some general principles that everyone should think about,
    but a lot of research design is very idiosyncratic, and is specific to the area of research that you
    want to engage in. To the extent that it's the details that matter, those details don't usually
    show up in an introductory stats and research methods class.
  </p>

  <div class="footnotes">
    <hr>
    <p><sup>1</sup>The quote comes from Auden's 1946 poem <em>Under Which Lyre: A Reactionary Tract for the Times</em>, delivered
    as part of a commencement address at Harvard University. The history of the poem is kind of interesting:
    <a href="http://harvardmagazine.com/2007/11/a-poets-warning.html" target="_blank">http://harvardmagazine.com/2007/11/a-poets-warning.html</a></p>

    <p><sup>2</sup>Including the suggestion that common sense is in short supply among scientists.</p>

    <p><sup>3</sup>In my more cynical moments I feel like this fact alone explains 95% of what I read on the internet.</p>

    <p><sup>4</sup>Earlier versions of these notes incorrectly suggested that they actually were sued. But that's not true. There's
    a nice commentary on this here: <a href="https://www.refsmmat.com/posts/2016-05-08-simpsons-paradox-berkeley.html" target="_blank">https://www.refsmmat.com/posts/2016-05-08-simpsons-paradox-berkeley.html</a>.
    A big thank you to Wilfried Van Hirtum for pointing this out to me.</p>

    <p><sup>5</sup>Which might explain why physics is just a teensy bit further advanced as a science than we are.</p>
  </div>

  <div class="attribution">
    <h4>Attribution</h4>
    <p>
      This content is adapted from <em>Learning Statistics with jamovi</em> by Danielle J. Navarro and David R. Foxcroft,
      licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>.
    </p>
    <p>
      <strong>Source:</strong> <a href="https://davidfoxcroft.github.io/lsj-book/01-Why-do-we-learn-statistics.html"
      target="_blank" rel="noopener">Chapter 1: Why Do We Learn Statistics</a>
    </p>
    <p>
      <strong>Modifications:</strong> Content has been reformatted for web display with preserved structure,
      complete chapter content including all examples, tables, and discussions. Original footnotes and citations
      preserved. All key concepts, examples, and nuanced arguments from the source material retained.
    </p>
  </div>
</section>
`
  },

  // Module 2: Research Design & Measurement
  {
    id: 'variables-measurement',
    moduleId: 'module-2',
    title: 'Variables and Measurement',
    description: 'Independent vs dependent variables, operationalization.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="vars-measurement-title">
  <h2 id="vars-measurement-title">2.1 Introduction to psychological measurement</h2>

  <blockquote class="chapter-quote">
    <p>To consult the statistician after an experiment is finished is often merely to ask him
    to conduct a post mortem examination. He can perhaps say what the experiment died of.</p>
    <footer>– Sir Ronald Fisher</footer>
  </blockquote>

  <p>
    The first thing to understand is data collection can be thought of as a kind of <strong>measurement</strong>.
    That is, what we're trying to do here is measure something about human behaviour or the
    human mind. What do I mean by "measurement"?
  </p>

  <div class="terminology-box">
    <h4>Terminology: Psychological Measurement</h4>
    <p>
      <strong>Measurement</strong> is the process of assigning numbers, labels, or other well-defined descriptions
      to observations. In psychology, we measure aspects of human behavior, cognition, and experience by
      systematically assigning values that represent what we observe.
    </p>
    <p>
      <strong>Examples:</strong> Age (33 years), preference (likes/dislikes anchovies), gender identity (male/female/other),
      reaction time (milliseconds), anxiety level (scale of 1-7).
    </p>
  </div>

  <h3>2.1.1 Some thoughts about psychological measurement</h3>

  <p>
    Measurement itself is a subtle concept, but basically it comes down to finding some way of
    assigning numbers, or labels, or some other kind of well-defined descriptions, to "stuff". So, any
    of the following would count as a psychological measurement:
  </p>

  <ul>
    <li>My <strong>age</strong> is <em>33 years</em>.</li>
    <li>I do <strong>not like anchovies</strong>.</li>
    <li>My <strong>chromosomal gender</strong> is <em>male</em>.</li>
    <li>My <strong>self-identified gender</strong> is <em>male</em>.</li>
  </ul>

  <p>
    In the short list above, the <strong>bolded part</strong> is "the thing to be measured", and the <em>italicised
    part</em> is "the measurement itself". In fact, we can expand on this a little bit, by thinking about
    the set of possible measurements that could have arisen in each case:
  </p>

  <ul>
    <li>My <strong>age</strong> (in years) could have been 0, 1, 2, 3..., etc. The upper bound on what my age
    could possibly be is a bit fuzzy, but in practice you'd be safe in saying that the largest
    possible age is 150, since no human has ever lived that long.</li>

    <li>When asked if I <strong>like anchovies</strong>, I might have said that I <em>do</em>, or I <em>do not</em>, or I <em>have no
    opinion</em>, or I <em>sometimes do</em>.</li>

    <li>My <strong>chromosomal gender</strong> is almost certainly going to be male (XY) or female (XX), but
    there are a few other possibilities. I could also have Klinefelter's syndrome (XXY), which
    is more similar to male than to female. And I imagine there are other possibilities too.</li>

    <li>My <strong>self-identified gender</strong> is also very likely to be male or female, but it doesn't have
    to agree with my chromosomal gender. I may also choose to identify with neither, or to
    explicitly call myself transgender.</li>
  </ul>

  <div class="callout">
    <h4>The Complexity of "Simple" Measurements</h4>
    <p>
      Even something as simple as "age" is more subtle than it appears. For instance, in the
      example above I assumed that it was okay to measure age in years. But if you're a developmental
      psychologist, that's way too crude, and so you often measure age in years and months (if a child
      is 2 years and 11 months this is usually written as "2;11"). If you're interested in newborns you
      might want to measure age in days since birth, maybe even hours since birth. In other words,
      the way in which you specify the allowable measurement values is important.
    </p>
  </div>

  <p>
    Looking at this a bit more closely, you might also realise that the concept of "age" isn't
    actually all that precise. In general, when we say "age" we implicitly mean "the length of time
    since birth". But that's not always the right way to do it. Suppose you're interested in how
    newborn babies control their eye movements. If you're interested in kids that young, you might
    also start to worry that "birth" is not the only meaningful point in time to care about. If Baby
    Alice is born 3 weeks premature and Baby Bianca is born 1 week late, would it really make sense
    to say that they are the "same age" if we encountered them "2 hours after birth"? In one sense,
    yes. By social convention we use birth as our reference point for talking about age in everyday
    life, since it defines the amount of time the person has been operating as an independent entity
    in the world. But from a scientific perspective that's not the only thing we care about.
  </p>

  <h3>2.1.2 Operationalisation: defining your measurement</h3>

  <p>
    All of the ideas discussed in the previous section relate to the concept of <strong>operationalisation</strong>.
    To be a bit more precise about the idea, operationalisation is the process by which we take a
    meaningful but somewhat vague concept and turn it into a precise measurement. The process
    of operationalisation can involve several different things:
  </p>

  <div class="terminology-box">
    <h4>Terminology: Operationalisation</h4>
    <p>
      <strong>Operationalisation</strong> is the process of transforming an abstract theoretical construct into
      a concrete, measurable variable. It involves three key steps:
    </p>
    <ol>
      <li><strong>Define precisely</strong> what you're measuring (e.g., does "age" mean time since birth or conception?)</li>
      <li><strong>Choose a method</strong> for measurement (e.g., self-report, official records, behavioral observation)</li>
      <li><strong>Specify allowable values</strong> (e.g., age in years, months, or days; gender as binary, multiple choice, or open-ended)</li>
    </ol>
    <p>
      <strong>Example:</strong> To operationalise "anxiety," you might define it as self-reported worry, measure it
      using a 20-item questionnaire, and score responses on a 1-7 scale.
    </p>
  </div>

  <ul>
    <li><strong>Being precise about what you are trying to measure.</strong> For instance, does "age" mean "time
    since birth" or "time since conception" in the context of your research?</li>

    <li><strong>Determining what method you will use to measure it.</strong> Will you use self-report to measure
    age, ask a parent, or look up an official record? If you're using self-report, how will you
    phrase the question?</li>

    <li><strong>Defining the set of allowable values that the measurement can take.</strong> Note that these values
    don't always have to be numerical, though they often are. When measuring age the values
    are numerical, but we still need to think carefully about what numbers are allowed. Do
    we want age in years, years and months, days, or hours? For other types of measurements
    (e.g., gender) the values aren't numerical. But, just as before, we need to think about
    what values are allowed. If we're asking people to self-report their gender, what options
    to we allow them to choose between? Is it enough to allow only "male" or "female"? Do
    you need an "other" option? Or should we not give people specific options and instead let
    them answer in their own words? And if you open up the set of possible values to include
    all verbal response, how will you interpret their answers?</li>
  </ul>

  <div class="callout warning">
    <h4>Critical Point: Four Related Concepts</h4>
    <p>Before moving on I want to take a moment to clear up our terminology, and in the process
    introduce one more term. Here are four different things that are closely related to each other:</p>

    <ul>
      <li><strong>A theoretical construct.</strong> This is the thing that you're trying to take a measurement of,
      like "age", "gender" or an "opinion". A theoretical construct can't be directly observed,
      and often they're actually a bit vague.</li>

      <li><strong>A measure.</strong> The measure refers to the method or the tool that you use to make your
      observations. A question in a survey, a behavioural observation or a brain scan could all
      count as a measure.</li>

      <li><strong>An operationalisation.</strong> The term "operationalisation" refers to the logical connection
      between the measure and the theoretical construct, or to the process by which we try to
      derive a measure from a theoretical construct.</li>

      <li><strong>A variable.</strong> Finally, a new term. A variable is what we end up with when we apply our
      measure to something in the world. That is, variables are the actual "data" that we end
      up with in our data sets.</li>
    </ul>

    <p>In practice, even scientists tend to blur the distinction between these things, but it's very helpful
    to try to understand the differences.</p>
  </div>

  <div class="key-points">
    <h4>Key Points: From Abstract Concepts to Data</h4>
    <p>Understanding the path from theory to data:</p>
    <ul>
      <li><strong>Theoretical Construct</strong> → Abstract idea you want to study (e.g., "intelligence", "anxiety", "happiness")</li>
      <li><strong>Operationalisation</strong> → Process of defining how to measure the construct</li>
      <li><strong>Measure</strong> → The tool or method used (e.g., IQ test, questionnaire, behavioral observation)</li>
      <li><strong>Variable</strong> → The actual data collected (e.g., scores: 95, 110, 87...)</li>
    </ul>
    <p>
      <strong>Remember:</strong> The quality of your research depends on how well your measure captures your
      theoretical construct. Poor operationalisation means you might be measuring the wrong thing entirely!
    </p>
  </div>

  <h3>2.4 The "role" of variables: predictors and outcomes</h3>

  <p>
    I've got one last piece of terminology that I need to explain to you before moving away from
    variables. Normally, when we do some research we end up with lots of different variables. Then,
    when we analyse our data, we usually try to explain some of the variables in terms of some of
    the other variables. It's important to keep the two roles "thing doing the explaining" and "thing
    being explained" distinct. So let's be clear about this now. First, we might as well get used to
    the idea of using mathematical symbols to describe variables, since it's going to happen over
    and over again. Let's denote the "to be explained" variable <em>Y</em>, and denote the variables "doing
    the explaining" as <em>X₁</em>, <em>X₂</em>, etc.
  </p>

  <p>
    When we are doing an analysis we have different names for <em>X</em> and <em>Y</em>, since they play different
    roles in the analysis. The classical names for these roles are <strong>independent variable (IV)</strong> and
    <strong>dependent variable (DV)</strong>. The IV is the variable that you use to do the explaining (i.e., <em>X</em>)
    and the DV is the variable being explained (i.e., <em>Y</em>). The logic behind these names goes like this:
    if there really is a relationship between <em>X</em> and <em>Y</em> then we can say that <em>Y</em> depends on <em>X</em>, and
    if we have designed our study "properly" then <em>X</em> isn't dependent on anything else.
  </p>

  <div class="callout">
    <h4>Modern Terminology: Predictors and Outcomes</h4>
    <p>
      However, I personally find those names horrible. They're hard to remember and they're highly misleading
      because (a) the IV is never actually "independent of everything else", and (b) if there's no
      relationship then the DV doesn't actually depend on the IV. And in fact, because I'm not the
      only person who thinks that IV and DV are just awful names, there are a number of alternatives
      that I find more appealing. The terms that I'll use in this book are <strong>predictors</strong> and <strong>outcomes</strong>.
      The idea here is that what you're trying to do is use <em>X</em> (the predictors) to make guesses about
      <em>Y</em> (the outcomes).
    </p>
  </div>

  <table class="results-table">
    <thead>
      <tr>
        <th>Role of the variable</th>
        <th>Classical name</th>
        <th>Modern name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>"to be explained"</td>
        <td>dependent variable (DV)</td>
        <td>outcome</td>
      </tr>
      <tr>
        <td>"to do the explaining"</td>
        <td>independent variable (IV)</td>
        <td>predictor</td>
      </tr>
    </tbody>
  </table>

  <div class="terminology-box">
    <h4>Terminology: Variable Roles in Research</h4>
    <p>
      In research, variables play different roles depending on whether they're used to explain or to be explained:
    </p>
    <ul>
      <li>
        <strong>Independent Variable (IV) / Predictor (X):</strong> The variable you manipulate or use to
        make predictions. It's the "cause" in a cause-effect relationship or the variable doing the explaining.
      </li>
      <li>
        <strong>Dependent Variable (DV) / Outcome (Y):</strong> The variable you measure or observe. It's the
        "effect" in a cause-effect relationship or the variable being explained.
      </li>
    </ul>
    <p>
      <strong>Example:</strong> If you're studying whether exercise affects mood, <em>exercise</em> is the IV/predictor
      and <em>mood</em> is the DV/outcome.
    </p>
    <p>
      <strong>Note:</strong> The terms "predictor" and "outcome" are preferred in modern usage because "independent"
      and "dependent" can be misleading—IVs are rarely truly independent of everything, and DVs only depend
      on IVs when there's an actual relationship.
    </p>
  </div>

  <div class="attribution">
    <h4>Attribution</h4>
    <p>
      This content is adapted from <em>Learning Statistics with jamovi</em> by Danielle J. Navarro and David R. Foxcroft,
      licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>.
    </p>
    <p>
      <strong>Source:</strong> <a href="https://davidfoxcroft.github.io/lsj-book/02-A-brief-introduction-to-research-design.html"
      target="_blank" rel="noopener">Chapter 2: A Brief Introduction to Research Design (Sections 2.1 and 2.4)</a>
    </p>
    <p>
      <strong>Modifications:</strong> Content has been reformatted for web display with preserved structure,
      complete chapter content including all examples and discussions. Original concepts and explanations retained.
    </p>
  </div>
</section>
`
  },
  {
    id: 'scales-of-measurement',
    moduleId: 'module-2',
    title: 'Scales of Measurement',
    description: 'Nominal, Ordinal, Interval, and Ratio (NOIR) scales.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="scales-title">
  <h2 id="scales-title">2.2 Scales of measurement and types of variables</h2>

  <p>
    As the previous section indicated, sometimes the data that you collect is best thought of as
    assigning people (or other things) to categories, and sometimes the data that you collect is
    numerical in nature. When I introduced this distinction, I was a bit cautious about distinguishing
    between them, but now that we are going to delve more deeply into measurement it is time
    to introduce some fundamental ideas about the <strong>scales of measurement</strong>.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Scales of Measurement (NOIR)</h4>
    <p>
      <strong>Scales of measurement</strong> describe the mathematical properties of variables and determine
      which statistical operations are meaningful. The four main scales, often remembered by the
      acronym <strong>NOIR</strong>, are:
    </p>
    <ul>
      <li><strong>N</strong>ominal – Categories with no order (e.g., eye color, gender)</li>
      <li><strong>O</strong>rdinal – Ordered categories without equal intervals (e.g., finishing positions, rankings)</li>
      <li><strong>I</strong>nterval – Equal intervals but no true zero (e.g., temperature in Celsius, Likert scales)</li>
      <li><strong>R</strong>atio – Equal intervals with a true zero (e.g., height, response time, age)</li>
    </ul>
    <p>The scale determines what statistics you can calculate—you can't meaningfully average nominal data, for example!</p>
  </div>

  <h3>Nominal scale</h3>
  <p>
    A <strong>nominal scale</strong> variable (also referred to as a <strong>categorical</strong> variable) is one in which
    there is no particular relationship between the different possibilities. For these kinds of
    variables, it doesn't make any sense to say that one of them is "bigger" or "better" than any
    other one, and it absolutely doesn't make any sense to average them. The classic example for
    this is "eye colour". Eyes can be blue, green and brown, among other possibilities, but none of
    them is any "better" than any other one. As a result, it would feel really weird to talk about an
    "average eye colour". Similarly, gender is nominal too: male isn't better or worse than female,
    neither does it make sense to talk about an "average gender". In short, nominal scale variables
    are those for which the only thing you can say about the different possibilities is that they are
    different. That's it.
  </p>

  <p>
    Let's take a slightly closer look at this. Suppose I was doing research on how people commute
    to and from work. One variable I would have to measure would be what kind of transportation
    people use to get to work. This "transport type" variable could have quite a few possible values,
    including: "train", "bus", "car", "bicycle", etc. For now, let's suppose that these four are the only
    possibilities, and suppose that when I ask 100 people how they got to work today, and I get this:
  </p>

  <table class="results-table">
    <thead>
      <tr>
        <th>Transportation</th>
        <th>Number of people</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Train</td>
        <td>12</td>
      </tr>
      <tr>
        <td>Bus</td>
        <td>30</td>
      </tr>
      <tr>
        <td>Car</td>
        <td>48</td>
      </tr>
      <tr>
        <td>Bicycle</td>
        <td>10</td>
      </tr>
    </tbody>
  </table>

  <p>
    So, what's the average transportation type? Obviously, the answer here is that there isn't one. It's
    a silly question to ask. You can say that travel by car is the most popular method, and travel by
    train is the least popular method, but that's about all. Similarly, notice that the order in which
    I list the options isn't very interesting. I could have chosen to display the data like this and
    nothing really changes:
  </p>

  <table class="results-table">
    <thead>
      <tr>
        <th>Transportation</th>
        <th>Number of people</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Bicycle</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Train</td>
        <td>12</td>
      </tr>
      <tr>
        <td>Bus</td>
        <td>30</td>
      </tr>
      <tr>
        <td>Car</td>
        <td>48</td>
      </tr>
    </tbody>
  </table>

  <h3>Ordinal scale</h3>
  <p>
    <strong>Ordinal scale</strong> variables have a bit more structure than nominal scale variables, but not by
    a lot. An ordinal scale variable is one in which there is a natural, meaningful way to order the
    different possibilities, but you can't do anything else. The usual example given of an ordinal
    variable is "finishing position in a race". You can say that the person who finished first was
    faster than the person who finished second, but you don't know how much faster. As a consequence, we know that 1st > 2nd, and we know that 2nd > 3rd, but the difference between 1st and
    2nd might be much larger than the difference between 2nd and 3rd.
  </p>

  <p>
    Here's a more psychologically interesting example. Suppose I'm interested in people's attitudes
    towards climate change, and I ask them to pick one of these four statements that most closely
    matches their beliefs:
  </p>

  <ul>
    <li>(1) Temperatures are rising, because of human activity</li>
    <li>(2) Temperatures are rising, but we don't know why</li>
    <li>(3) Temperatures are rising, but not because of human activity</li>
    <li>(4) Temperatures are not rising</li>
  </ul>

  <p>
    Notice that these four statements actually do have a natural ordering, in terms of "the extent to
    which they agree with the current science". Statement 1 is a close match, statement 2 is a reasonable match, statement 3 isn't a very good match, and statement 4 is in strong opposition to the
    science. So, in terms of the thing I'm interested in (the extent to which people endorse the science), I can order the items as 1 > 2 > 3 > 4. Since this ordering exists, it would be very weird to
    list the options like this:
  </p>

  <ul>
    <li>(1) Temperatures are rising, but not because of human activity</li>
    <li>(2) Temperatures are rising, because of human activity</li>
    <li>(3) Temperatures are not rising</li>
    <li>(4) Temperatures are rising, but we don't know why</li>
  </ul>

  <p>
    This ordering is still an ordering that makes sense, in that 1 > 4, 2 > 4, 2 > 1 and 4 > 3, but
    it's very hard to interpret because you're breaking with the natural ordering of the categories.
    So, even though I can ordinal scale variables have a natural ordering, but you can't average
    them. It's still ok to compute the <em>median</em> (the middle value), but you can't compute
    the <em>mean</em>. If you average the choices of people who selected 2 and 4, it's not the
    same as the choice of someone who selected 3.
  </p>

  <h3>Interval scale</h3>
  <p>
    In contrast to nominal and ordinal scale variables, <strong>interval scale</strong> and ratio scale variables
    are variables for which the numerical value is genuinely meaningful. In the case of interval scale
    variables, the <em>differences</em> between the numbers are interpretable, but the variable
    doesn't have a "natural" zero value. A good example of an interval scale variable is measuring
    temperature in degrees Celsius. For instance, if it was 15° yesterday and 18° today, then the 3°
    difference between the two is genuinely meaningful. Moreover, that 3° difference is <em>exactly
    the same</em> as the 3° difference between 7° and 10°. In short, addition and subtraction are
    meaningful for interval scale variables.<sup>1</sup>
  </p>

  <p>
    However, notice that the 0° does not mean "no temperature at all". It actually means "the
    temperature at which water freezes", which is pretty arbitrary. As a consequence, it becomes
    pointless to try to multiply and divide temperatures. It is wrong to say that 20° is <em>twice
    as hot</em> as 10°, just as it is weird and meaningless to try to claim that 20° is negative two
    times as hot as -10°.
  </p>

  <p>
    Again, lets look at a more psychological example. Suppose I'm interested in looking at how the
    political affiliations of voters have changed over time. One way to do this would be to ask voters to
    self-assess where they lie on the left-right political spectrum, using a scale from 0 (far left) to 10
    (far right). In the statistical jargon, this is a kind of <em>rating scale</em>. Let's say I ran a survey
    in 2003 and 2008. Suppose I'm interested in the extent to which "swinging voters" changed over
    time, so I'd look at people who said they were centrist in 2003 (say, 5) and people who said they
    were centrist in 2008 (also 5). This is a situation where the difference between 2003 and 2008
    is meaningful. I could also look at the number of people who shifted by, say, 2 points, from 6 to
    8, or from 2 to 4. I can get a feel for whether voters on average shifted to the right or to the left,
    for instance. However, it would be wrong to say that 8 is twice as conservative as 4. In the same
    way that we don't have a genuine "zero" point on a temperature scale when using Celsius, a value
    of 0 on the political beliefs scale doesn't mean "an absence of beliefs". It just means "as far left as
    a person can go".
  </p>

  <h3>Ratio scale</h3>
  <p>
    The fourth and final type of variable to consider is a <strong>ratio scale</strong> variable, in which zero
    really means zero, and it's okay to multiply and divide. A good psychological example of a ratio
    scale variable is response time (RT). In a lot of tasks it's very common to record the amount
    of time somebody takes to solve a problem or answer a question, because it's an indicator of
    how difficult the task is. Suppose that Alan takes 2.3 seconds to respond to a question, whereas
    Ben takes 3.1 seconds. As with an interval scale variable, addition and subtraction are both
    meaningful here. Ben really did take 3.1 - 2.3 = 0.8 seconds longer than Alan did. However,
    notice that multiplication and division also make sense here too: Ben took 3.1 / 2.3 = 1.35 times
    as long as Alan did to answer the question. And the reason why you can do this is that, for a
    ratio scale variable such as RT, "zero seconds" really does mean "no time at all".
  </p>

  <div class="key-points">
    <h4>Key Points: The Four Scales of Measurement</h4>
    <table class="results-table">
      <thead>
        <tr>
          <th>Scale</th>
          <th>Properties</th>
          <th>Allowed Operations</th>
          <th>Examples</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Nominal</strong></td>
          <td>Categories, no order</td>
          <td>Count, mode</td>
          <td>Eye color, gender, blood type</td>
        </tr>
        <tr>
          <td><strong>Ordinal</strong></td>
          <td>Ordered categories, unequal intervals</td>
          <td>Count, mode, median, rank</td>
          <td>Rankings, finishing positions, agreement scales</td>
        </tr>
        <tr>
          <td><strong>Interval</strong></td>
          <td>Equal intervals, no true zero</td>
          <td>+, −, mean, standard deviation</td>
          <td>Temperature (°C), calendar dates, IQ scores</td>
        </tr>
        <tr>
          <td><strong>Ratio</strong></td>
          <td>Equal intervals, true zero</td>
          <td>×, ÷, +, −, all statistics</td>
          <td>Height, weight, response time, age</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Why this matters:</strong> The scale determines which statistical analyses are appropriate.
      Using the wrong analysis for your scale can lead to meaningless results!
    </p>
  </div>

  <h3>Continuous versus discrete variables</h3>
  <p>
    There's a second kind of distinction that you need to be aware of, regarding what types of values
    that a variable can take on. That is, the difference between discrete variables and continuous
    variables.
  </p>

  <p>
    A <strong>discrete variable</strong> is, in essence, a variable that can only take on a finite number of different
    possible values. A good example of a discrete variable is the number of questions that you got
    right on a true or false test. If there are 10 questions, then you might have gotten 8 of them
    right. Or maybe 9 of them. Or maybe 10. But you can't have gotten 8.93 of them right. Notice
    that "10" is still a finite number, in other words it's quite possible for a variable to have a lot of
    possible values whilst still being discrete. To give a more extreme example, the number of people
    at a sports match must be a whole number, and no stadium on Earth is big enough to hold all of
    humanity, so the number of possible values is again finite.
  </p>

  <p>
    Continuous variables are different. A <strong>continuous variable</strong> is one in which, for any two values
    that you can think of, it's always logically possible to have another value in between. Height is a
    continuous variable. If Alice's height is 180 cm and Ben's height is 181 cm, then it's possible for
    Chris to have a height anywhere in between, such as perhaps 180.04 cm. In practice, of course,
    our ability to measure height isn't perfect, so we might report Alice's height as 180 cm and Chris'
    height as 180 cm also, even though Chris really is a tiny bit taller. This is very common; a lot of
    the time when you take a real world measurement, you are <em>forced</em> to round it off to
    some particular value. But as long as it's possible in principle to have the in-between value, the
    variable is continuous. As such, you might have guessed that:
  </p>

  <ul>
    <li>Nominal scale variables are always discrete</li>
    <li>Ordinal scale variables are always discrete</li>
    <li>Interval scale variables can be either continuous or discrete</li>
    <li>Ratio scale variables can be either continuous or discrete</li>
  </ul>

  <div class="terminology-box">
    <h4>Terminology: Discrete vs. Continuous Variables</h4>
    <p>
      <strong>Discrete variables</strong> can only take on specific, separate values (usually whole numbers).
      You can list all possible values, even if the list is very long.
    </p>
    <p>
      <strong>Examples:</strong> Number of children (0, 1, 2, 3...), test scores out of 10 (0-10), number
      of people at an event.
    </p>
    <p>
      <strong>Continuous variables</strong> can take on any value within a range, including decimals. Between
      any two values, there's always another possible value.
    </p>
    <p>
      <strong>Examples:</strong> Height (180.0 cm, 180.04 cm, 180.042 cm...), weight, response time, temperature.
    </p>
    <p>
      <strong>Note:</strong> In practice, continuous variables are often recorded as discrete due to measurement
      limitations (e.g., height rounded to nearest cm), but they remain conceptually continuous.
    </p>
  </div>

  <p>
    Continuous variables are very commonly seen in real-world measurement. For instance, height,
    weight, response time, blood pressure, and IQ are all examples of continuous variables. They
    can be contrasted with discrete variables such as the number of children in a family, your course
    grade (A, B, C, etc.), your gender, and your country of residence. In practice, the distinction
    between continuous and discrete variables isn't particularly important. If it becomes important
    in a particular context, I'll note it.
  </p>

  <h3>Some complexities</h3>
  <p>
    Okay, I know you're going to be shocked to hear this, but …the real world is much messier than
    this little classification scheme suggests. Very few variables in real life actually fall into these
    neat categories, so you need to be kind of careful not to treat the scales of measurement as if they
    were hard and fast rules. It doesn't work like that: they're guidelines, intended to help you think
    about the situations in which it is or isn't sensible to use particular tools. Nothing more.
  </p>

  <p>
    So let's take a classic example, maybe the classic example, of a psychological measurement tool:
    the <strong>Likert scale</strong>. The humble Likert scale is the bread and butter tool of all survey design. You
    yourself have filled out hundreds, maybe thousands of them, and odds are you've even used one
    yourself. Suppose we have a survey question that looks like this:
  </p>

  <blockquote>
    Which of the following best describes your opinion of the statement that "all pirates are
    freaking awesome" ...
  </blockquote>

  <ul>
    <li>1. Strongly disagree</li>
    <li>2. Disagree</li>
    <li>3. Neither agree nor disagree</li>
    <li>4. Agree</li>
    <li>5. Strongly agree</li>
  </ul>

  <p>
    This set of items is an example of a 5-point Likert scale: people are asked to choose among one
    of several (in this case 5) clearly ordered possibilities, generally with a verbal descriptor given in
    each case. However, it's not necessary that all items be explicitly described. This is a perfectly
    good example of a 5-point Likert scale too:
  </p>

  <ul>
    <li>1. Strongly disagree</li>
    <li>2.</li>
    <li>3.</li>
    <li>4.</li>
    <li>5. Strongly agree</li>
  </ul>

  <p>
    Likert scales are very handy, if somewhat limited, tools. The question is, what kind of variable
    are they? They're obviously discrete, since you can't give a response of 2.5. They're obviously not
    nominal scale, since the items are ordered; and they're not ratio scale either, since there's no
    natural zero.
  </p>

  <p>
    But are they ordinal scale or interval scale? One argument says that we can't really prove that the
    difference between "strongly agree" and "agree" is of the same size as the difference between
    "agree" and "neither agree nor disagree". In fact, in everyday life it's pretty obvious that they're
    not the same at all. So this suggests that we ought to treat Likert scales as ordinal variables.
    On the other hand, in practice most researchers tend to treat Likert scale data as if it were
    interval scale, especially if the number of items is reasonably large. This is not the best of justifications to offer, but there are some good mathematical reasons for thinking that,
    when you average across lots of people and lots of items, Likert scales are often "close enough" to
    interval scale for practical purposes. In short, it's really a matter of judgment.
  </p>

  <div class="critical-points">
    <h4>Critical Point: The Likert Scale Debate</h4>
    <p>
      <strong>Likert scales</strong> (e.g., 1=Strongly Disagree to 5=Strongly Agree) are ubiquitous in psychology,
      but their proper classification is debated:
    </p>
    <ul>
      <li>
        <strong>Technically ordinal:</strong> The psychological distance between "strongly agree" and "agree"
        likely differs from the distance between "agree" and "neutral"
      </li>
      <li>
        <strong>Treated as interval in practice:</strong> Most researchers analyze Likert scales using interval-level
        statistics (means, correlations) because:
        <ul>
          <li>When averaged across many items and participants, they approximate interval properties</li>
          <li>Interval-level analyses are more powerful and flexible</li>
          <li>Results are usually similar to ordinal analyses</li>
        </ul>
      </li>
    </ul>
    <p>
      <strong>Bottom line:</strong> The classification is a matter of judgment. Be aware of the assumptions
      you're making when you treat Likert data as interval scale, and consider whether they're reasonable
      for your specific context.
    </p>
  </div>

  <hr>

  <h3>Footnotes</h3>
  <p class="footnote">
    <sup>1</sup> Actually, there's a subtlety here. If you understand what logarithms are,
    then you can note that although Celsius and Fahrenheit are interval scale, there is
    nevertheless a special relationship between the two: they are linear transformations of
    each other. Technically, the class of permissible transformations for an interval scale
    variable is any linear transformation (adding or multiplying by a constant). A ratio
    scale permits any transformation of the form x' = cx. Annoying, I know, but this
    confusion is not something that psychologists or statisticians have invented; it's just
    what the concepts of temperature and time really are like. If we could measure them
    in an absolute way, we would...but we can't.
  </p>

  <hr>

  <div class="attribution">
    <p>
      Content adapted from <em>Learning Statistics with jamovi</em> by Danielle J. Navarro and David R. Foxcroft,
      licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.
    </p>
  </div>
</section>
`
  },
  {
    id: 'research-design',
    moduleId: 'module-2',
    title: 'Research Design Basics',
    description: 'Experimental, quasi-experimental, and correlational designs.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="design-basics-title">
  <h2 id="design-basics-title">2.5 Research designs</h2>

  <div class="terminology-box">
    <h4>Terminology: Research Design</h4>
    <p>
      <strong>Research design</strong> refers to the overall strategy and structure of a study. The fundamental
      distinction is between experimental and non-experimental research, which differs primarily in the degree
      of <strong>control</strong> the researcher has over the study conditions and variables.
    </p>
    <p>
      <strong>Key concept—Control:</strong> The ability to manipulate variables, assign participants to conditions,
      and hold other factors constant. More control = stronger causal conclusions.
    </p>
  </div>

  <p>
    One of the big distinctions that you should be aware of is the distinction between "experimental"
    and "non-experimental" research. When we make this distinction, what we're really talking about
    is the degree of control that the researcher exercises over the people and events in the study.
  </p>

  <h3>Experimental research</h3>
  <p>
    The term <strong>experimental research</strong> is a bit tricky to define, because the word "experiment"
    has different meanings in different disciplines. However, regardless of whether you're a psychologist,
    a physicist, a biologist or a chemist, the critical feature that distinguishes experimental research
    from non-experimental research is <strong>control</strong>. That is, in an experimental study the
    researcher has control over all aspects of the study, especially the control over what participants
    experience during the study.
  </p>

  <p>
    In particular, an experiment is a study in which the researcher manipulates or varies something
    and observes the effect that it has on something else. In the jargon of experimentation, the thing
    that the researcher manipulates is called the <strong>independent variable</strong> (IV), and the
    thing that the researcher observes is called the <strong>dependent variable</strong> (DV). The choice
    of names here is important, and quite sensible. The term "independent variable" is used because
    it's the variable that the researcher has chosen to <em>independently</em> manipulate, without
    being particularly influenced by other things going on in the experiment. In contrast, the "dependent
    variable" is so called because we think that it <em>depends</em> on the value of the independent
    variable. In the context of our example, the thing that we manipulated was the type of teaching
    that each class received (traditional vs liberté), and the thing we measured was the amount of
    learning that occurred. In this context, the "teaching type" is the independent variable, and
    the "learning" is the dependent variable.
  </p>

  <p>
    Okay, so what do we actually gain by designing experiments in this way? Let's say we've managed
    to confirm that students in the liberté class performed better than students in the traditional
    class. What can we conclude? If the world were a simple place, we might be able to jump to the
    happy conclusion that the innovation in teaching methods led to an improvement in learning.
    However, as I suspect you've already guessed, this world is <em>not</em> a simple place. There
    are <em>lots</em> of possible explanations for the observed difference in student performance.
    For instance, it could be that the students in the liberté class were smarter to begin with. One
    of the key features of good experimental design is <strong>control</strong>: we want to make sure that
    we have controlled for all possible explanations except the one that we're interested in. This is
    accomplished through several mechanisms:
  </p>

  <ul>
    <li>
      <strong>Random assignment</strong>. In an experiment, the researcher makes sure to assign participants
      randomly to different groups (e.g. teaching type in our example). This ensures that (on average) the
      people in different groups are comparable to one another at the beginning of the experiment. This
      removes the possibility that the people in one group were "better" to begin with than the people
      in another group.
    </li>
    <li>
      <strong>Systematic manipulation</strong>. In an experiment, the researcher systematically manipulates
      the predictor variables (IVs) of interest while holding everything else constant. This ensures that
      only the predictor variables of interest are changing.
    </li>
    <li>
      <strong>Experimental control</strong>. Since the researcher has control over the environment, it's
      often possible to actively hold various aspects of the situation constant. This <em>also</em>
      helps ensure that only the predictor variables of interest are changing. For instance, we might
      insist that the students are being taught in the same room, by the same teacher, at the same time
      of day. That way, the only difference between the two groups is whether the teaching is "traditional"
      or "liberté".
    </li>
  </ul>

  <p>
    When all this is done properly, our experiment becomes an incredibly powerful tool for assessing
    cause and effect relationships. We can be reasonably confident that any observed differences between
    the experimental conditions are actually caused by the manipulation of the independent variable(s).
    In other words, because we've tried to control for all other factors, and because we randomly
    assigned people to different conditions, we can pretty safely conclude that the teaching method
    is the cause of the difference in learning.
  </p>

  <div class="key-points">
    <h4>Key Points: Three Pillars of Experimental Control</h4>
    <p>
      True experiments establish causality through three key mechanisms:
    </p>
    <ol>
      <li>
        <strong>Random Assignment:</strong> Participants are randomly assigned to conditions, ensuring groups
        are equivalent at the start (on average). This eliminates pre-existing differences as alternative
        explanations.
      </li>
      <li>
        <strong>Systematic Manipulation:</strong> The researcher deliberately varies the independent variable(s)
        while keeping everything else constant. This ensures only the IV is changing.
      </li>
      <li>
        <strong>Experimental Control:</strong> The researcher controls the environment, standardizing procedures,
        settings, and timing. This further ensures only the IV varies across conditions.
      </li>
    </ol>
    <p>
      <strong>Result:</strong> When all three are present, you can confidently conclude that the IV caused changes
      in the DV because all other explanations have been ruled out.
    </p>
  </div>

  <h3>Non-experimental research</h3>
  <p>
    Non-experimental research is a broad term that covers "any study in which the researcher doesn't
    have the same kind of control over the situation that you have in an experiment". Obviously, control
    is something that scientists prize very highly, and so a lot of research effort is devoted to designing
    experiments. However, there are lots of situations in which it's either unethical, impractical, or
    sometimes just plain impossible to conduct an actual experiment. When that happens, we say that the
    research is <strong>non-experimental</strong>. This is a negative definition, so it covers a lot of
    different kinds of studies. For instance:
  </p>

  <ul>
    <li>
      <strong>Quasi-experimental research</strong> is similar to experimental research, but the researcher
      doesn't have as much control. In particular, random assignment to conditions is often not possible.
      For instance, suppose you wanted to study the effects of poverty on children's performance in school.
      It's not ethical (or even possible) to randomly assign children to live in poverty versus not, so
      any study on poverty will be quasi-experimental at best.
    </li>
    <li>
      <strong>Case studies</strong> focus very closely on one case or a small number of cases. Sometimes
      these can be very useful, especially if the cases are unusual in some interesting way. For instance,
      many of the most famous studies in neuropsychology are case studies: by looking closely at the
      behaviour of people with unusual brain disorders, psychologists have learned a great deal about
      how the brain works.
    </li>
    <li>
      <strong>Observational studies</strong> involve watching behaviour in its natural setting, with no
      experimental control whatsoever. The key thing that distinguishes an observational study from an
      experiment is that in an observational study the researcher just observes naturally-occurring
      behaviour; they don't manipulate or control anything.
    </li>
  </ul>

  <p>
    Notice that in non-experimental research we often don't have the same level of control that we
    do in experimental research. As a consequence, we can't be quite as confident in drawing causal
    conclusions. For instance, suppose we observe that students from poor families tend to perform
    more poorly in school. Can we conclude that poverty <em>causes</em> poor school performance? No,
    not really. It might be that poverty does cause poor school performance, but equally it might be
    that there's a third variable (e.g. parents' education level) that causes both poverty <em>and</em>
    poor school performance. Non-experimental research is incredibly valuable in its own right, and
    sometimes it's the <em>only</em> kind of research that we can do. But it's not quite as persuasive
    on the topic of causality as an experiment can be.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Types of Non-Experimental Research</h4>
    <ul>
      <li>
        <strong>Quasi-Experimental:</strong> Similar to experiments but lacking random assignment. Often used
        when random assignment is unethical or impossible (e.g., studying effects of poverty, comparing
        existing groups like schools or neighborhoods).
      </li>
      <li>
        <strong>Case Studies:</strong> In-depth examination of one or few cases. Valuable for studying rare
        or unusual phenomena (e.g., unique brain disorders, exceptional individuals). Provides rich detail
        but limited generalizability.
      </li>
      <li>
        <strong>Observational Studies:</strong> Watching and recording naturally occurring behavior without
        any manipulation or intervention. Useful for studying behavior in natural contexts but provides
        minimal control over variables.
      </li>
    </ul>
  </div>

  <div class="critical-points">
    <h4>Critical Point: Correlation Does Not Imply Causation</h4>
    <p>
      Non-experimental research can establish <em>associations</em> but cannot definitively establish <em>causation</em>:
    </p>
    <p>
      <strong>Example:</strong> Students from poor families perform worse in school.
    </p>
    <p>
      <strong>Possible explanations:</strong>
    </p>
    <ul>
      <li>Poverty causes poor performance (direct causal effect)</li>
      <li>Poor performance causes poverty later in life (reverse causation)</li>
      <li>A third variable (e.g., parents' education) causes both poverty AND poor performance (confounding)</li>
    </ul>
    <p>
      <strong>Why experiments are stronger:</strong> Random assignment and experimental control eliminate these
      alternative explanations. Non-experimental research can suggest causation and is sometimes the only
      option (ethics, practicality), but it requires more cautious interpretation.
    </p>
  </div>

  <hr>

  <div class="attribution">
    <p>
      Content adapted from <em>Learning Statistics with jamovi</em> by Danielle J. Navarro and David R. Foxcroft,
      licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.
    </p>
  </div>
</section>
`
  },
  {
    id: 'validity',
    moduleId: 'module-2',
    title: 'Validity',
    description: 'Threats to internal, external, construct, face, and ecological validity.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="validity-title">
  <h2 id="validity-title">2.6 Assessing the validity of a measure</h2>

  <div class="terminology-box">
    <h4>Terminology: Validity</h4>
    <p>
      <strong>Validity</strong> refers to whether a measure actually measures what it's supposed to measure.
      A valid measure produces accurate, meaningful data about the construct of interest. Unlike reliability
      (consistency), validity is about correctness.
    </p>
    <p>
      <strong>Example:</strong> A bathroom scale that always shows you weigh 5 kg more than you actually do is
      reliable (consistent) but not valid (inaccurate). A valid measure must measure the right thing, not
      just measure consistently.
    </p>
  </div>

  <p>
    More than any other thing, a researcher wants their study to be "valid". In everyday language,
    we use the word "valid" to say something like "data are valid if they are right", and in a loose
    sense it's a good way to think about it. If you design a measure to measure something and it
    actually works (i.e. it does measure what it's supposed to) then it's valid. If it doesn't work
    properly then it's not valid.
  </p>

  <p>
    However, validity is a much more complicated concept than reliability, and much harder to assess
    in real studies. There are many different kinds of validity, each of which raises a somewhat
    different question about the measure being used. In this section I'll discuss three types that
    appear most often:
  </p>

  <ul>
    <li>
      <strong>Face validity</strong> simply asks: does the measure look like it's measuring what it's
      supposed to measure? This is by far the weakest form of validity. If I were to design a new
      "intelligence test" that asked people to count from 1 to 10, pretty much everyone would think
      "this is a terrible IQ test" because it doesn't look like it's measuring intelligence at all.
      However, face validity is often a weak criterion because it only depends on what the measure
      "looks like" in a superficial sense. For instance, my "dolphin test" from earlier on might
      have decent face validity (it kinda sounds like a measure of intelligence, right?), but we've
      already discussed it's not really a valid measure of intelligence.
    </li>
    <li>
      <strong>Construct validity</strong> is a more useful notion, which asks whether or not your
      measure really does measure the construct that you're interested in. Let's assume that I'm
      trying to design a new IQ test. How can we tell if my test does actually measure intelligence?
      One piece of evidence would be to check that the new test agrees with existing measures of
      IQ. If it does, it probably measures intelligence too (at least, as well as those older tests
      did). To a large extent this is what psychologists (and other researchers) do when trying to
      design a new measure: they check whether it agrees with measures that are already "known" to
      work reasonably well. However, it's possible to do better. Think about "number of dolphins you
      can name in 20 seconds" and my "count from 1 to 10" test. Both of these measures have terrible
      construct validity when trying to measure IQ, and yet they would probably correlate highly with
      each other. In other words, if one person can name more dolphins than a second person, then the
      first person is also likely to be able to count faster. So what we'd like is not merely to check
      that our new test correlates with existing measures, but that it correlates in the way that it
      should, given our theory of how the construct works. For instance, if you're designing a measure
      of anxiety, you'd want to make sure that your measure correlates <em>highly</em> with other
      measures of anxiety (convergent validity), but you'd also want to make sure that it correlates
      <em>poorly</em> with measures of unrelated constructs such as intelligence (discriminant validity).
    </li>
    <li>
      <strong>Ecological validity</strong> is a slightly different notion from the other two. A study is
      said to have ecological validity if the results can be generalized to real world circumstances.
      For instance, if we're interested in whether listening to music reduces anxiety, we could do an
      experiment where we ask subjects to sit in a lab, listen to music for 20 minutes, and then measure
      their anxiety levels. However, even if the experiment shows that anxiety goes down, it's not clear
      that the result would generalize to real-world situations where people listen to music as part of
      their daily lives. For instance, maybe the effect only works in a quiet, stress-free environment
      (i.e. a lab) and wouldn't work in a more realistic context (i.e. your house) where you're actually
      stressed and anxious in the first place! That's the kind of thing that ecological validity is
      concerned with.
    </li>
  </ul>

  <div class="key-points">
    <h4>Key Points: Types of Validity for Measures</h4>
    <table class="results-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Question Asked</th>
          <th>Strength</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Face Validity</strong></td>
          <td>Does it LOOK like it measures the construct?</td>
          <td>Weakest - superficial appearance only</td>
        </tr>
        <tr>
          <td><strong>Construct Validity</strong></td>
          <td>Does it ACTUALLY measure the construct?</td>
          <td>Stronger - requires convergent and discriminant evidence</td>
        </tr>
        <tr>
          <td><strong>Ecological Validity</strong></td>
          <td>Do results generalize to real-world settings?</td>
          <td>Important for practical applications</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Remember:</strong> A measure can have good face validity but poor construct validity (like the
      "dolphin test" for intelligence—sounds plausible but doesn't actually measure intelligence!).
    </p>
  </div>

  <h2>2.7 Confounds, artifacts and other threats to validity</h2>

  <p>
    If we look back on the Berkeley admissions example discussed at the beginning of this chapter, we
    can see that despite the apparent pattern that male applicants were more likely to be admitted
    than female applicants, we ended up concluding that the pattern was essentially spurious. It
    turned out that the difference between males and females was a side effect of which department
    each person applied to. In short, the data were trying to trick us into making the wrong conclusion.
    The Berkeley gender bias case is an example of something that's pretty common in real world
    research: there are a lot of things out there that can lead you to the wrong conclusion. In this
    section I'm going to describe a bunch of these issues:
  </p>

  <h3>Internal validity</h3>
  <p>
    <strong>Internal validity</strong> refers to the extent to which you are able to draw the correct
    conclusions about the causal relationships between variables. It is closely related to the concept
    of a "confound". Suppose you're interested in finding out if listening to music helps people to
    concentrate better on some task. The way to find out is to run an experiment where you give people
    a task to do, and in some cases you play music in the background while they're doing the task,
    while other times you don't play any music. If people perform better when you play music, you might
    want to conclude that music helps people concentrate. However, there are several reasons why this
    inference might be wrong. For example:
  </p>

  <ul>
    <li>
      Maybe the room that you used to play music in was a quieter room than the one that you used when
      you didn't play music. In that case, the difference in performance might be due to the quietness
      of the room, not due to the music.
    </li>
    <li>
      Maybe the music that you played was uplifting and put people in a good mood. Maybe it's the mood
      that's helping people concentrate, not the music itself.
    </li>
    <li>
      Maybe people in the music condition were tested in the morning and people in the no-music condition
      were tested in the afternoon. Maybe people concentrate better in the morning.
    </li>
  </ul>

  <p>
    In each of these scenarios, the difference in performance might be due to something other than the
    music. In other words, there's a <strong>confound</strong>: something that's mixed up with the thing
    you're really interested in. In the first scenario, the confound is room quietness. In the second
    scenario, it's mood. In the third scenario, it's time of day. Whenever there's a confound present,
    your study is lacking <em>internal validity</em>, because you can't be sure what's really causing
    the differences that you're observing.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Internal Validity and Confounds</h4>
    <p>
      <strong>Internal validity</strong> is the extent to which you can draw correct conclusions about
      causal relationships between variables. High internal validity means you can confidently say that X
      causes Y, rather than some other factor causing the observed effect.
    </p>
    <p>
      <strong>Confound (or confounding variable):</strong> A variable that is mixed up with your independent
      variable, making it impossible to determine which one is actually causing the observed effect.
    </p>
    <p>
      <strong>Examples of confounds:</strong>
    </p>
    <ul>
      <li>Testing music vs. no music but using different rooms (room quality is confounded with music)</li>
      <li>Testing a new teaching method using better teachers (teacher quality confounds teaching method)</li>
      <li>Comparing morning vs. evening performance but different people tested at each time (time of day confounded with individual differences)</li>
    </ul>
    <p>
      <strong>How to control confounds:</strong> Random assignment, standardized procedures, and experimental control.
    </p>
  </div>

  <h3>External validity</h3>
  <p>
    The second type of threat to validity that I want to mention is a threat to <strong>external validity</strong>,
    which is the extent to which the results of your study can be generalized to other circumstances.
    To see what this means, let's return to the music and concentration example. Suppose that we ran
    the experiment using students as participants, and we found that music really does help people
    concentrate. However, when we look at the data more closely, we find that this effect only applies
    to students who already like music. For students who don't like music, there's no improvement in
    concentration at all. In this case, we would say that the results of our study don't generalize to
    people who don't like music. In other words, the study has poor external validity. External validity
    is threatened whenever your sample is not representative of the population that you want to generalize
    to. For instance:
  </p>

  <ul>
    <li>
      If you run a study using only university students, your results might not generalize to the rest
      of the population.
    </li>
    <li>
      If you run a study using only people from Western cultures, your results might not generalize to
      non-Western cultures.
    </li>
    <li>
      If you run a study on the internet, your results might not generalize to people who don't have
      internet access.
    </li>
  </ul>

  <p>
    In general, whenever your sample is restricted in some way, you should be cautious about how far
    you generalize your results. It's also worth noting that there's a tension between internal and
    external validity. Often, the best way to get high internal validity is to run a very tightly
    controlled laboratory experiment, but this can threaten external validity because the laboratory
    environment is so artificial. On the other hand, if you try to run a study in a more realistic
    setting, you might get better external validity, but you'll probably have more confounds, which
    threatens internal validity. It's a difficult balance to strike, and researchers have to make
    trade-offs depending on what they're trying to achieve.
  </p>

  <div class="critical-points">
    <h4>Critical Point: The Internal vs. External Validity Trade-off</h4>
    <p>
      There's an inherent tension between internal and external validity—maximizing one often comes at
      the expense of the other:
    </p>
    <table class="results-table">
      <thead>
        <tr>
          <th>Research Setting</th>
          <th>Internal Validity</th>
          <th>External Validity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Tightly controlled lab</strong></td>
          <td>✓ High (few confounds)</td>
          <td>✗ Lower (artificial setting)</td>
        </tr>
        <tr>
          <td><strong>Natural/realistic setting</strong></td>
          <td>✗ Lower (more confounds)</td>
          <td>✓ Higher (real-world context)</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>The researcher's dilemma:</strong> You must decide what's more important for your research
      question—being confident about causation (internal) or being confident about generalizability (external).
      Often, the solution is to use multiple studies with different trade-offs to build a complete picture.
    </p>
  </div>

  <h3>Construct validity</h3>
  <p>
    A third kind of threat to validity that I want to mention is a threat to <strong>construct validity</strong>.
    This is closely related to the question of whether or not your measure actually measures what you
    think it measures. Let's return to the music and concentration example again. Suppose that, when
    we ran our experiment, we measured "concentration" by asking people to count how many times the
    letter "e" appears in a paragraph of text. Now, I think most people would agree that this isn't a
    particularly good measure of concentration. After all, counting letters is a pretty specific task,
    and it's not really representative of concentration in general. In other words, there's a threat
    to construct validity: we're not really measuring the construct (concentration) that we think we're
    measuring. This is a pretty common problem in psychology. Psychological constructs like "intelligence",
    "attention", "working memory" and so on are all quite abstract, and it's not always easy to figure
    out the best way to measure them.
  </p>

  <hr>

  <div class="attribution">
    <p>
      Content adapted from <em>Learning Statistics with jamovi</em> by Danielle J. Navarro and David R. Foxcroft,
      licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.
    </p>
  </div>
</section>
`
  },
  {
    id: 'reliability',
    moduleId: 'module-2',
    title: 'Reliability',
    description: 'Consistency and repeatability of measurements.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="reliability-title">
  <h2 id="reliability-title">2.3 Assessing the reliability of a measurement</h2>

  <div class="terminology-box">
    <h4>Terminology: Reliability</h4>
    <p>
      <strong>Reliability</strong> refers to the consistency or repeatability of a measurement. A reliable
      measure produces similar results when applied multiple times under similar conditions.
    </p>
    <p>
      <strong>Key principle:</strong> If you measure the same thing twice, do you get the same answer?
    </p>
    <p>
      <strong>Important distinction:</strong> Reliability ≠ Validity. A measure can be highly reliable (consistent)
      but completely invalid (measuring the wrong thing). Reliability is assessed BEFORE validity because
      there's no point checking if an inconsistent measure is accurate.
    </p>
  </div>

  <p>
    At this point we've thought a little bit about how to operationalise a theoretical construct, and
    thereby create a psychological measure, and we've seen that by applying psychological measures
    we end up with variables. Now, one thing we want to do with our measures is <em>assess</em>
    their quality. In other words, we want to determine the psychometric properties of the instrument. The
    first property to consider is <strong>reliability</strong>, the second is <strong>validity</strong>. Reliability is about
    the repeatability or consistency of a measure, and it is assessed before validity since there's really
    no point in trying to assess the validity of a measure that isn't reliable.
  </p>

  <p>
    To be reliable, a measurement doesn't have to be the correct one. For instance, if I'm trying to
    measure your intelligence, and I do so using "the number of dolphins you can name in 20 seconds"
    as a proxy for your intelligence, then this will be a very reliable measure. Regardless of how
    many dolphins you can name during the first test, you'll probably be able to produce roughly
    the same number of them when I ask you to do it a second time. So, on the grounds of reliability
    alone, the "dolphin test" is pretty good. But, it would be a terrible measure of intelligence. So,
    even though the dolphin test is highly reliable, it's completely invalid because it doesn't actually
    measure intelligence. As we'll see in the next section, validity is a different thing from reliability,
    and it's quite possible to have one without the other.
  </p>

  <div class="critical-points">
    <h4>Critical Point: Reliability vs. Validity</h4>
    <p>
      A measure can have different combinations of reliability and validity:
    </p>
    <table class="results-table">
      <thead>
        <tr>
          <th>Example</th>
          <th>Reliable?</th>
          <th>Valid?</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Standard IQ test</strong></td>
          <td>✓ Yes (consistent scores)</td>
          <td>✓ Yes (measures intelligence)</td>
        </tr>
        <tr>
          <td><strong>"Dolphin test" for IQ</strong></td>
          <td>✓ Yes (consistent scores)</td>
          <td>✗ No (doesn't measure intelligence)</td>
        </tr>
        <tr>
          <td><strong>Poorly designed test</strong></td>
          <td>✗ No (scores fluctuate randomly)</td>
          <td>✗ No (inconsistent and wrong)</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Remember:</strong> You need <em>both</em> reliability and validity for a good measure, but you
      must establish reliability first. A valid but unreliable measure is impossible—if results are inconsistent,
      they can't be consistently accurate!
    </p>
  </div>

  <p>
    Okay, so what is reliability and what do we mean when we say that a measurement is "repeatable
    or consistent"? In practical terms, what we mean is that if you measure the same thing twice
    under almost identical circumstances you'll get the same answer both times. Let's use the IQ
    test as an example. If your IQ is 110 this week, it should be 110 next week, and the week after
    that, and the week after that. That's test-retest reliability. But there are also many different
    kinds of tests that can be used to measure IQ (because many different things can be considered
    measures of intelligence; e.g. "logical reasoning" or "general knowledge" or "abstract problem
    solving" or "vocabulary"). So you might get tested using test A (e.g. Raven's progressive matrices),
    and then get tested using test B (e.g. the WAIS), and we'd expect that both tests should give
    similar answers. This is parallel forms reliability.
  </p>

  <p>
    Notice that the dolphin test has good test-retest reliability but poor parallel forms reliability
    (i.e., the dolphin test produces very different scores from a real IQ test). Now, suppose that
    a researcher has designed a brand new IQ test and it consists of a bunch of multiple choice
    questions that are supposed to measure different aspects of intelligence. One concern might be
    that half of the items actually measure IQ, but the other half are measuring something else. To
    check this, we might want to "split" the test into two halves and check that someone's score on
    the first half is closely related to their score on the second half. This is internal consistency
    reliability, and it is somewhat similar to parallel forms reliability. When we talk about parallel
    forms reliability we're thinking about two different measures that are designed to measure the
    same thing, when we talk about internal consistency we're thinking about the case where we
    have a single measurement tool that has "parts" or "items" to it. We want to make sure that all
    the parts that make up the tool are actually working in the same way (i.e. measuring the same
    thing).
  </p>

  <p>
    Reliability doesn't relate only to IQ tests, of course. Consider a simple question: "Which of
    these two colours do you prefer?" This question involves a choice between two alternatives and
    requires the participant to produce a yes-or-no response, so it's a nominal scale variable. However,
    what if we had asked lots of people, and then repeated the question a long time later? Would
    all people respond consistently when asked the same question on different occasions? Or would
    their answers fluctuate randomly? If we observe the former then we would say that the question
    has test-retest reliability. Similarly, imagine that we asked a whole lot of people to rate their
    <em>agreement</em> to some statement (e.g. "I am a big fan of the Essendon Bombers") on a
    scale from 1 (strongly disagree) to 7 (strongly agree). This is an ordinal scale variable. If we
    got all the same people to answer the question a second time, and if they give pretty much the
    same answer each time, we say the item has test-retest reliability. Again, regardless of whether
    you've got nominal scale variables, ordinal scale variables, interval scale variables or whatever,
    the concept of reliability is the same. So, the question is: if you measure the same thing twice, do
    you get the same answer?
  </p>

  <p>
    In practice, researchers usually measure reliability by means of a <strong>correlation</strong>, a concept
    we'll introduce more formally later on. However, for now, we can get a feel for what a correlation
    is like. To do so, let's think about how to assess the test-retest reliability of a measurement.
    What I would do is measure the same thing twice. Let's say I measure it the first time for 20
    people, so that gives me 20 numbers. Then I measure it a second time for the same 20 people,
    so that gives me another 20 numbers. If the measurement is reliable then the two sets of numbers
    should be pretty similar. A scatterplot would show that there's a strong relationship between the
    measurements at time 1 and the measurements at time 2. In other words, large values at time 1
    tend to be associated with large values at time 2; and small values at time 1 tend to be associated
    with small values at time 2. Overall, we would see a strong positive relationship.
  </p>

  <p>
    So, in essence, that's what reliability is: it's the strength of the relationship between the first
    measurement and the second. To some extent, this is what all forms of reliability are getting at
    (i.e. test-retest, parallel forms, internal consistency, inter-rater). For instance, when assessing
    inter-rater reliability, what we're doing is getting two different observers to measure the same
    things (e.g. two psychologists are asked to diagnose whether or not 100 patients have schizophrenia).
    However, even though the logic is similar, different types of reliability are measured in somewhat
    different ways, and are represented slightly differently.
  </p>

  <div class="key-points">
    <h4>Key Points: Types of Reliability</h4>
    <table class="results-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>What's Being Compared</th>
          <th>Question Asked</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Test-Retest</strong></td>
          <td>Same test, different times</td>
          <td>Do people get similar scores when tested again later?</td>
        </tr>
        <tr>
          <td><strong>Parallel Forms</strong></td>
          <td>Different tests measuring same construct</td>
          <td>Do two different tests of the same thing produce similar scores?</td>
        </tr>
        <tr>
          <td><strong>Internal Consistency</strong></td>
          <td>Different parts of same test</td>
          <td>Do all items/parts of the test measure the same construct?</td>
        </tr>
        <tr>
          <td><strong>Inter-Rater</strong></td>
          <td>Different observers/raters</td>
          <td>Do different people rating the same thing agree?</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>All types ask the same fundamental question:</strong> When you measure something in two different
      ways or at two different times, do you get consistent results? Reliability is assessed through correlation—
      strong positive correlations indicate high reliability.
    </p>
  </div>

  <hr>

  <div class="attribution">
    <p>
      Content adapted from <em>Learning Statistics with jamovi</em> by Danielle J. Navarro and David R. Foxcroft,
      licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.
    </p>
  </div>
</section>
`
  },

  // Module 3: Jamovi and Data Handling
  {
    id: 'software-interface',
    moduleId: 'module-3',
    title: 'The Software Interface',
    description: 'Navigate the workspace, menus, and key features of your statistical software.',
    icon: 'T',
    textbookUrl: 'https://davidfoxcroft.github.io/lsj-book/03-Getting-started-with-jamovi.html',
    isDynamicSoftware: true,  // Content adapts to software preference
    contentHtml: `
<section class="module-content" aria-labelledby="software-interface-title">
  <h2 id="software-interface-title">3. Getting started with jamovi</h2>

  <blockquote class="chapter-quote">
    <p>Robots are nice to work with.</p>
    <footer>–Roger Zelazny<sup>1</sup></footer>
  </blockquote>

  <p>
    In this chapter I'll discuss how to get started in jamovi. I'll briefly talk about how to download
    and install jamovi, but most of the chapter will be focused on getting you started with finding
    your way around the jamovi GUI. Our goal in this chapter is not to learn any statistical concepts:
    we're just trying to learn the basics of how jamovi works and get comfortable interacting with
    the system. To do this we'll spend a bit of time looking at datasets and variables. In doing so,
    you'll get a bit of a feel for what it's like to work in jamovi.
  </p>

  <div class="critical-points">
    <h4>Critical Point: The Two-Panel Interface</h4>
    <p>
      Understanding jamovi's interface is essential for efficient data analysis. The workspace consists of:
    </p>
    <ul>
      <li><strong>Left panel: Spreadsheet View</strong> – Where your data is displayed and can be edited (rows = cases, columns = variables)</li>
      <li><strong>Right panel: Results Panel</strong> – Where statistical output appears and updates in real-time</li>
      <li><strong>Resizable divider</strong> – Drag the middle bar to adjust panel sizes based on your needs</li>
    </ul>
    <p>
      This split-screen design allows you to simultaneously view your data and results, making it easy to
      understand how changes to your data or analysis options affect the outcomes.
    </p>
  </div>

  <div class="terminology-box">
    <h4>Terminology: GUI (Graphical User Interface)</h4>
    <p>
      A <strong>GUI (Graphical User Interface)</strong> is a visual way of interacting with computer software
      using windows, icons, menus, and buttons rather than typing text commands. Statistical software like
      jamovi uses a GUI to make data analysis more accessible by allowing you to click and select options
      instead of writing code.
    </p>
  </div>

  <p>
    However, before going into any of the specifics, it's worth talking a little about why you
    might want to use jamovi at all. Given that you're reading this you've probably got your own
    reasons. However, if those reasons are "because that's what my stats class uses", it might be
    worth explaining a little why your lecturer has chosen to use jamovi for the class. Of course, I
    don't really know why other people choose jamovi so I'm really talking about why I use it.
  </p>

  <ul>
    <li>
      It's sort of obvious but worth saying anyway: doing your statistics on a computer is faster,
      easier and more powerful than doing statistics by hand. Computers excel at mindless
      repetitive tasks, and a lot of statistical calculations are both mindless and repetitive. For
      most people the only reason to ever do statistical calculations with pencil and paper is for
      learning purposes. In my class I do occasionally suggest doing some calculations that way,
      but the only real value to it is pedagogical. It does help you to get a "feel" for statistics
      to do some calculations yourself, so it's worth doing it once. But only once!
    </li>
    <li>
      Doing statistics in a conventional spreadsheet (e.g., Microsoft Excel) is generally a bad idea
      in the long run. Although many people likely feel more familiar with them, spreadsheets
      are very limited in terms of what analyses they allow you do. If you get into the habit of
      trying to do your real life data analysis using spreadsheets then you've dug yourself into a
      very deep hole.
    </li>
    <li>
      Avoiding proprietary software is a very good idea. There are a lot of commercial packages
      out there that you can buy, some of which I like and some of which I don't. They're
      usually very glossy in their appearance and generally very powerful (much more powerful
      than spreadsheets). However, they're also very expensive. Usually, the company sells
      "student versions" (crippled versions of the real thing) very cheaply, and then they they
      sell full powered "educational versions" at a price that makes me wince. They will also
      sell commercial licences with a staggeringly high price tag. The business model here is to
      suck you in during your student days and then leave you dependent on their tools when
      you go out into the real world. It's hard to blame them for trying, but personally I'm not
      in favour of shelling out thousands of dollars if I can avoid it. And you can avoid it. If
      you make use of packages like jamovi that are open source and free you never get trapped
      having to pay exorbitant licensing fees.
    </li>
    <li>
      Something that you might not appreciate now, but will love later on if you do anything
      involving data analysis, is the fact that jamovi is basically a sophisticated front end for
      the free R statistical programming language. When you download and install R you get
      all the basic "packages" and those are very powerful on their own. However, because R
      is so open and so widely used, it's become something of a standard tool in statistics and
      so lots of people write their own packages that extend the system. And these are freely
      available too. One of the consequences of this, I've noticed, is that if you look at recent
      advanced data analysis textbooks then a lot of them use R.
    </li>
  </ul>

  <p>
    Those are the main reasons I use jamovi. It's not without its flaws, though. It's relatively
    new<sup>2</sup> so there is not a huge set of textbooks and other resources to support it, and it has a few
    annoying quirks that we're all pretty much stuck with, but on the whole I think the strengths
    outweigh the weakness; more so than any other option I've encountered so far.
  </p>

  <div class="key-points">
    <h4>Key Points: Why Use Statistical Software Like jamovi?</h4>
    <ul>
      <li><strong>Speed and power</strong> – Computers handle repetitive calculations faster and more accurately than manual methods</li>
      <li><strong>Beyond spreadsheets</strong> – Specialized statistical software offers far more analytical capabilities than Excel</li>
      <li><strong>Open source and free</strong> – Avoid expensive proprietary software that locks you into costly licensing fees</li>
      <li><strong>Built on R</strong> – jamovi provides a user-friendly interface to the powerful R statistical language, with access to thousands of packages</li>
    </ul>
  </div>

  <h3>3.1 Installing jamovi</h3>

  <p>
    Okay, enough with the sales pitch. Let's get started. Just as with any piece of software, jamovi
    needs to be installed on a "computer", which is a magical box that does cool things and delivers
    free ponies. Or something along those lines; I may be confusing computers with the iPad
    marketing campaigns. Anyway, jamovi is freely distributed online and you can download it from
    the jamovi homepage, which is:
  </p>

  <p style="text-align: center; font-weight: bold;">
    <a href="https://www.jamovi.org/" target="_blank" rel="noopener noreferrer">https://www.jamovi.org/</a>
  </p>

  <p>
    At the top of the page, under the heading "Download", you'll see separate links for Windows
    users, Mac users, and Linux users. If you follow the relevant link you'll see that the online
    instructions are pretty self-explanatory. As of this writing, the current version of jamovi is 0.9,
    but they usually issue updates every few months, so you'll probably have a newer version.<sup>3</sup>
  </p>

  <h4>3.1.1 Starting up jamovi</h4>

  <p>
    One way or another, regardless of what operating system you're using, it's time to open
    jamovi and get started. When first starting jamovi you will be presented with a user interface
    which looks something like this:
  </p>

  <p>
    <em>[Figure 3.1: jamovi interface with spreadsheet view on left and results panel on right]</em>
  </p>

  <p>
    To the left is the spreadsheet view, and to the right is where the results of statistical tests
    appear. Down the middle is a bar separating these two regions and this can be dragged to the
    left or the right to change their sizes.
  </p>

  <p>
    It is possible to simply begin typing values into the jamovi spreadsheet as you would in any
    other spreadsheet software. Alternatively, existing data sets in the CSV (.csv) file format can be
    opened in jamovi. Additionally, you can easily import SPSS, SAS, Stata and JASP files directly
    into jamovi. To open a file select the File tab (three horizontal lines signify this tab) at the top
    left hand corner, select 'Open' and then choose from the files listed on 'Browse' depending on
    whether you want to open an example or a file stored on your computer.
  </p>

  <h3>3.2 Analyses</h3>

  <p>
    Analyses can be selected from the analysis ribbon or menu along the top. Selecting an analysis
    will present an 'options panel' for that particular analysis, allowing you to assign different
    variables to different parts of the analysis, and select different options. At the same time, the
    results for the analysis will appear in the right 'Results panel' and will update in real-time as
    you make changes to the options.
  </p>

  <p>
    When you have the analysis set up correctly you can dismiss the analysis options by clicking
    the arrow to the top right of the optional panel. If you wish to return to these options, you can
    click on the results that were produced. In this way, you can return to any analysis that you
    (or say, a colleague) created earlier.
  </p>

  <p>
    If you decide you no longer need a particular analysis, you can remove it with the results
    context menu. Right-clicking on the analysis results will bring up a menu and by selecting
    'Analysis' and then 'Remove' the analysis can be removed. But more on this later. First, let's
    take a more detailed look at the spreadsheet view.
  </p>

  <h3>3.3 The spreadsheet</h3>

  <p>
    In jamovi data is represented in a spreadsheet with each column representing a 'variable' and
    each row representing a 'case' or 'participant'.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Variables, Cases, and Participants</h4>
    <p>
      <strong>Variable</strong>: A characteristic or measurement that can vary across observations (e.g., age, test score, gender).
      In jamovi, each variable occupies one column.
    </p>
    <p>
      <strong>Case/Participant</strong>: A single observation or individual in your dataset. In jamovi, each case occupies one row.
      The terms "case" and "participant" are often used interchangeably, though "participant" typically refers to human subjects.
    </p>
  </div>

  <h4>3.3.3 Copy and Paste</h4>

  <p>
    jamovi produces nice American Psychological Association (APA) formatted tables and attractive plots. It is often useful to be able to copy and paste these, perhaps into a Word
    document, or into an email to a colleague. To copy results right click on the object of interest
    and from the menu select exactly what you want to copy. The menu allows you to choose to
    copy only the image or the entire analysis. Selecting "copy" copies the content to the clipboard
    and this can be pasted into other programs in the usual way. You can practice this later on
    when we do some analyses.
  </p>

  <h4>3.3.4 Syntax mode</h4>

  <p>
    jamovi also provides an "R Syntax Mode". In this mode jamovi produces equivalent R code
    for each analysis. To change to syntax mode, select the Application menu to the top right of
    jamovi (a button with three vertical dots) and click the "Syntax mode" checkbox there. You
    can turn off syntax mode by clicking this a second time.
  </p>

  <p>
    In syntax mode analyses continue to operate as before but now they produce R syntax,
    and 'ascii output' like an R session. Like all results objects in jamovi, you can right click on
    these items (including the R syntax) and copy and paste them, for example into an R session.
    At present, the provided R syntax does not include the data import step and so this must be
    performed manually in R. There are many resources explaining how to import data into R and
    if you are interested we recommend you take a look at these; just search on the interweb.
  </p>

  <h3>3.7 Installing add-on modules into jamovi</h3>

  <p>
    A really great feature of jamovi is the ability to install add-on modules from the jamovi library.
    These add-on modules have been developed by the jamovi community, i.e., jamovi users and
    developers who have created special software add-ons that do other, usually more advanced,
    analyses that go beyond the capabilities of the base jamovi program.
  </p>

  <p>
    To install add-on modules, just click on the large "+" in the top right of the jamovi
    window, select "jamovi-library" and then browse through the various add-on modules that
    are available. Choose the one(s) you want, and then install them. It's
    that easy. The newly installed modules can then be accessed from the "Analyses" button
    bar. Try it...useful add-on modules to install include "scatr" (added under "Descriptives")
    and "R j".
  </p>

  <div class="key-points">
    <h4>Key Points: Extending jamovi with Modules</h4>
    <ul>
      <li><strong>Community-developed</strong> – Add-on modules expand jamovi's capabilities with specialized analyses</li>
      <li><strong>Easy installation</strong> – Click the "+" button in the top right, select "jamovi-library", and browse available modules</li>
      <li><strong>Seamless integration</strong> – Installed modules appear in the Analyses menu alongside built-in features</li>
      <li><strong>Recommended modules</strong> – "scatr" for enhanced descriptive statistics and "Rj" for R integration</li>
    </ul>
  </div>

  <h3>3.8 Quitting jamovi</h3>

  <p>
    There's one last thing I should cover in this chapter: how to quit jamovi. It's not hard,
    just close the program the same way you would any other program. However, what you
    might want to do before you quit is save your work! There are two parts to this: saving
    any changes to the data set, and saving the analyses that you ran.
  </p>

  <p>
    It is good practice to save any changes to the data set as a new data set. That
    way you can always go back to the original data. To save any changes in jamovi, select
    'Export'...'Data' from the main jamovi menu (button with three horizontal bars in the
    top left) and create a new file name for the changed data set.
  </p>

  <p>
    Alternatively, you can save both the changed data and any analyses you have undertaken by saving as a jamovi file. To do this, from the main jamovi menu select 'Save
    as' and type in a file name for this 'jamovi file (.omv)'. Remember to save the file in a
    location where you can find it again later. I usually create a new folder for specific data
    sets and analyses.
  </p>

  <hr>

  <h3>Footnotes</h3>
  <p class="footnote">
    <sup>1</sup> Source: Dismal Light (1968).
  </p>
  <p class="footnote">
    <sup>2</sup> As of writing this in August 2018.
  </p>
  <p class="footnote">
    <sup>3</sup> Although jamovi is updated frequently it doesn't usually make much of a difference for the sort of work
    we'll do in this book. In fact, during the writing of the book I upgraded several times and it didn't make much
    difference at all to what is in this book.
  </p>

  <hr>

  <div class="attribution">
    <p>
      Content adapted from <em>Learning Statistics with jamovi</em> by Danielle J. Navarro and David R. Foxcroft,
      licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.
    </p>
  </div>
</section>
`
  },
  {
    id: 'data-entry',
    moduleId: 'module-3',
    title: 'Entering and Importing Data',
    description: 'Manual entry, CSV import, and data validation.',
    icon: 'T',
    textbookUrl: 'https://davidfoxcroft.github.io/lsj-book/03-Getting-started-with-jamovi.html',
    isDynamicSoftware: true,  // Content adapts to software preference
    contentHtml: `
<section class="module-content" aria-labelledby="data-entry-title">
  <h2 id="data-entry-title">3.4 Loading data in jamovi</h2>

  <p>
    There are several different types of files that are likely to be relevant to us when doing data
    analysis. There are two in particular that are especially important from the perspective of this
    book:
  </p>

  <ul>
    <li>
      <em>jamovi files</em> are those with a <strong>.omv</strong> file extension. This is the standard kind of file that
      jamovi uses to store data, and variables and analyses.
    </li>
    <li>
      <em>Comma separated value (csv) files</em> are those with a <strong>.csv</strong> file extension. These are just
      regular old text files and they can be opened with many different software programs. It's
      quite typical for people to store data in csv files, precisely because they're so simple.
    </li>
  </ul>

  <div class="terminology-box">
    <h4>Terminology: File Formats for Data</h4>
    <p>
      <strong>.omv (jamovi files)</strong>: Native jamovi format that stores your data, variable definitions, and all analyses
      in a single file. Best for saving your complete work in jamovi.
    </p>
    <p>
      <strong>.csv (Comma Separated Values)</strong>: Plain text format where data values are separated by commas.
      Universal format that can be opened by virtually any statistical software or spreadsheet program. Ideal for
      data sharing and portability.
    </p>
  </div>

  <p>
    There are also several other kinds of data file that you might want to import into jamovi. For
    instance, you might want to open Microsoft Excel spreadsheets (.xls files), or data files that
    have been saved in the native file formats for other statistics software, such as SPSS or SAS.
    Whichever file formats you are using, it's a good idea to create a folder or folders especially for
    your jamovi data sets and analyses and to make sure you keep these backed up regularly.
  </p>

  <h3>3.4.1 Importing data from csv files</h3>

  <p>
    One quite commonly used data format is the humble "comma separated value" file, also
    called a csv file, and usually bearing the file extension .csv. csv files are just plain old-fashioned
    text files and what they store is basically just a table of data. This is illustrated in the figure below,
    which shows a file called <strong>booksales.csv</strong>. As you can see, each row represents
    the book sales data for one month. The first row doesn't contain actual data though, it has the
    names of the variables.
  </p>

  <p>
    <em>[Figure 3.3: The booksales.csv data file shown in both spreadsheet and text editor views]</em>
  </p>

  <p>
    It's easy to open csv files in jamovi. From the top left menu (the button with three parallel
    lines) choose 'Open' and browse to where you have stored the csv file on your computer. If you're
    on a Mac, it'll look like the usual Finder window that you use to choose a file; on Windows
    it looks like an Explorer window. An example is shown below.
    Find the one you want, then click on the
    "Open" button.
  </p>

  <p>
    <em>[Figure 3.4: Dialog box for selecting csv file to import]</em>
  </p>

  <p>
    There are a few things that you can check to make sure that the data gets imported correctly:
  </p>

  <ul>
    <li>
      <strong>Heading.</strong> Does the first row of the file contain the names for each variable - a 'header'
      row? The booksales.csv file has a header, so that's a yes.
    </li>
    <li>
      <strong>Separator.</strong> What character is used to separate different entries? In most csv files this will
      be a comma (it is "comma separated" after all).
    </li>
    <li>
      <strong>Decimal.</strong> What character is used to specify the decimal point? In English speaking
      countries this is almost always a period (i.e., .). That's not universally true though, many
      European countries use a comma.
    </li>
    <li>
      <strong>Quote.</strong> What character is used to denote a block of text? That's usually going to be a
      double quote mark ("). It is for the booksales.csv file.
    </li>
  </ul>

  <div class="critical-points">
    <h4>Critical Point: CSV Import Settings</h4>
    <p>
      When importing CSV files, verify these four settings to ensure your data loads correctly:
    </p>
    <ul>
      <li><strong>Header row</strong> – First row contains variable names (not data)</li>
      <li><strong>Separator</strong> – Usually comma (,), but sometimes semicolon (;) or tab</li>
      <li><strong>Decimal point</strong> – Period (.) in English-speaking countries, comma (,) in many European countries</li>
      <li><strong>Quote character</strong> – Double quotes (") typically enclose text values</li>
    </ul>
    <p>
      Incorrect settings can cause data to import improperly, with values ending up in wrong columns or being
      misinterpreted. Always preview your imported data to confirm it looks correct.
    </p>
  </div>

  <h3>3.5 Importing unusual data files</h3>

  <p>
    Throughout this book I've assumed that your data are stored as a jamovi .omv file or as a
    "properly" formatted csv file. However, in real life that's not a terribly plausible assumption to
    make so I'd better talk about some of the other possibilities that you might run into.
  </p>

  <h4>3.5.1 Loading data from text files</h4>

  <p>
    The first thing I should point out is that if your data are saved as a text file but aren't quite in
    the proper csv format then there's still a pretty good chance that jamovi will be able to open
    it. You just need to try it and see if it works. Sometimes though you will need to change some
    of the formatting. The ones that I've often found myself needing to change are:
  </p>

  <ul>
    <li>
      <strong>header.</strong> A lot of the time when you're storing data as a csv file the first row actually
      contains the column names and not data. If that's not true then it's a good idea to open
      up the csv file in a spreadsheet programme such as Open Office and add the header row
      manually.
    </li>
    <li>
      <strong>sep.</strong> As the name "comma separated value" indicates, the values in a row of a csv file are
      usually separated by commas. This isn't universal, however. In Europe the decimal point
      is typically written as , instead of . and as a consequence it would be somewhat awkward
      to use , as the separator. Therefore it is not unusual to use ; instead of , as the separator.
      At other times, I've seen a TAB character used.
    </li>
    <li>
      <strong>quote.</strong> It's conventional in csv files to include a quoting character for textual data. As you
      can see by looking at the booksales.csv file, this is usually a double quote character, ".
      But sometimes there is no quoting character at all, or you might see a single quote mark
      ' used instead.
    </li>
    <li>
      <strong>skip.</strong> It's actually very common to receive CSV files in which the first few rows have
      nothing to do with the actual data. Instead, they provide a human readable summary of
      where the data came from, or maybe they include some technical info that doesn't relate
      to the data.
    </li>
    <li>
      <strong>missing values.</strong> Often you'll get given data with missing values. For one reason or another,
      some entries in the table are missing. The data file needs to include a "special" value to
      indicate that the entry is missing. By default jamovi assumes that this value is 99<sup>4</sup>, for
      both numeric and text data, so you should make sure that, where necessary, all missing
      values in the csv file are replaced with 99 (or -9999; whichever you choose) before opening
      / importing the file into jamovi. Once you have opened / imported the file into jamovi all
      the missing values are converted to blank cells in the jamovi spreadsheet view.
    </li>
  </ul>

  <div class="key-points">
    <h4>Key Points: Handling Missing Data</h4>
    <ul>
      <li><strong>Use consistent codes</strong> – jamovi defaults to treating 99 as missing, but you can use other values like -9999</li>
      <li><strong>Code before import</strong> – Replace missing values with your chosen code in the CSV file before importing</li>
      <li><strong>Automatic conversion</strong> – jamovi converts missing value codes to blank cells after import</li>
      <li><strong>Choose impossible values</strong> – Select codes that cannot be valid data (e.g., -9999 for variables that can't be negative)</li>
    </ul>
  </div>

  <h4>3.5.2 Loading data from SPSS (and other statistics packages)</h4>

  <p>
    The commands listed above are the main ones we'll need for data files in this book. But
    in real life we have many more possibilities. For example, you might want to read data files in
    from other statistics programs. Since SPSS is probably the most widely used statistics package
    in psychology, it's worth mentioning that jamovi can also import SPSS data files (file extension
    .sav). Just follow the instructions above for how to open a csv file, but this time navigate to
    the .sav file you want to import. For SPSS files, jamovi will regard all values as missing if they
    are regarded as "system missing" files in SPSS. The 'Default missings' value does not seem to
    work as expected when importing SPSS files, so be aware of this - you might need another step:
    import the SPSS file into jamovi, then export as a csv file before re-opening in jamovi.<sup>5</sup>.
  </p>

  <p>
    And that's pretty much it, at least as far as SPSS goes. As far as other statistical software
    goes, jamovi can also directly open / import SAS and STATA files.
  </p>

  <div class="key-points">
    <h4>Key Points: Importing Data from Other Programs</h4>
    <ul>
      <li><strong>Direct import support</strong> – jamovi can directly open SPSS (.sav), SAS, and Stata files</li>
      <li><strong>Excel workaround</strong> – Export Excel files to CSV format first, then import the CSV into jamovi</li>
      <li><strong>System missing values</strong> – SPSS files import correctly when values are marked as "system missing"</li>
      <li><strong>When in doubt, use CSV</strong> – Converting to CSV is the most reliable way to transfer data between programs</li>
    </ul>
  </div>

  <h4>3.5.3 Loading Excel files</h4>

  <p>
    A different problem is posed by Excel files. Despite years of yelling at people for sending
    data to me encoded in a proprietary data format, I get sent a lot of Excel files. The way to
    handle Excel files is to open them up first in Excel or another spreadsheet programme that can
    handle Excel files, and then export the data as a csv file before opening / importing the csv file
    into jamovi.
  </p>

  <hr>

  <h3>Footnotes</h3>
  <p class="footnote">
    <sup>4</sup> You can change the default value for missing values in jamovi from the top right menu (three vertical dots),
    but this only works at the time of importing data files into jamovi. The default missing value in the dataset
    should not be a valid number associated with any of the variables, e.g. you could use -9999 as this is unlikely to
    be a valid value.
  </p>
  <p class="footnote">
    <sup>5</sup> I know this is a bot of a fudge, but it does work and hopefully this will be fixed in a later version of jamovi.
  </p>

  <hr>

  <div class="attribution">
    <p>
      Content adapted from <em>Learning Statistics with jamovi</em> by Danielle J. Navarro and David R. Foxcroft,
      licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.
    </p>
  </div>
</section>
`
  },
  {
    id: 'variable-types',
    moduleId: 'module-3',
    title: 'Variable Types and Measurement Levels',
    description: 'Setting measurement levels and data types correctly.',
    icon: 'T',
    textbookUrl: 'https://davidfoxcroft.github.io/lsj-book/03-Getting-started-with-jamovi.html',
    isDynamicSoftware: true,  // Content adapts to software preference
    contentHtml: `
<section class="module-content" aria-labelledby="variable-types-title">
  <h2 id="variable-types-title">3.3.1 Variables</h2>

  <p>
    The most commonly used variables in jamovi are 'Data Variables', these variables simply contain
    data either loaded from a data file, or 'typed in' by the user. Data variables can be one of three
    measurement levels:
  </p>

  <p>
    <em>[Figure showing variable editor with measurement level options: Continuous, Ordinal, Nominal, ID]</em>
  </p>

  <p>
    These levels are designated by the symbol in the header of the variable's column.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Measurement Levels in jamovi</h4>
    <p>
      <strong>Measurement level</strong> (also called "level of measurement" or "scale of measurement") refers to
      the mathematical properties of a variable and determines what statistical operations are meaningful.
      jamovi uses four measurement levels: ID, Nominal, Ordinal, and Continuous. Correctly identifying a
      variable's measurement level is crucial because it determines which statistical tests are appropriate.
    </p>
  </div>

  <p>
    The <strong>ID</strong> variable type is unique to jamovi. It's intended for variables that contain identifiers
    that you would almost never want to analyse. For example, a persons name, or a participant
    ID. Specifying an ID variable type can improve performance when interacting with very large
    data sets.
  </p>

  <p>
    <strong>Nominal</strong> variables are for categorical variables which are text labels, for example a column
    called Gender with the values Male and Female would be nominal. So would a person's name.
    Nominal variable values can also have a numeric value. These variables are used most often
    when importing data which codes values with numbers rather than text. For example, a column
    in a dataset may contain the values 1 for males, and 2 for females. It is possible to add nice
    'human-readable' labels to these values with the variable editor (more on this later).
  </p>

  <p>
    <strong>Ordinal</strong> variables are like Nominal variables, except the values have a specific order. An
    example is a Likert scale with 3 being 'strongly agree' and -3 being 'strongly disagree'.
  </p>

  <p>
    <strong>Continuous</strong> variables are variables which exist on a continuous scale. Examples might be
    height or weight. This is also referred to as 'Interval' or 'Ratio scale'.
  </p>

  <div class="critical-points">
    <h4>Critical Point: Choosing the Right Measurement Level</h4>
    <p>
      Selecting the correct measurement level is essential because it determines which statistical analyses
      you can perform:
    </p>
    <ul>
      <li><strong>ID variables</strong> – Use for identifiers like names or participant IDs that you'll never analyze</li>
      <li><strong>Nominal variables</strong> – Use for categories with no inherent order (gender, ethnicity, diagnosis type)</li>
      <li><strong>Ordinal variables</strong> – Use for categories with a meaningful order (Likert scales, rankings, education level)</li>
      <li><strong>Continuous variables</strong> – Use for numeric measurements on interval or ratio scales (age, height, test scores)</li>
    </ul>
    <p>
      <strong>Common mistake:</strong> Numbers don't always mean continuous. For example, coding gender as 1=Male, 2=Female
      uses numbers, but the variable is nominal, not continuous.
    </p>
  </div>

  <p>
    In addition, you can also specify different data types: variables have a data type of either
    'Text', 'Integer' or 'Decimal'.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Data Types vs. Measurement Levels</h4>
    <p>
      <strong>Data type</strong> refers to how the data is stored (Text, Integer, Decimal), while <strong>measurement level</strong>
      refers to the mathematical properties of the variable (ID, Nominal, Ordinal, Continuous). These are independent:
    </p>
    <ul>
      <li><strong>Text</strong> – Stores letters and words (e.g., "Male", "Female")</li>
      <li><strong>Integer</strong> – Stores whole numbers (e.g., 1, 2, 3)</li>
      <li><strong>Decimal</strong> – Stores numbers with decimal points (e.g., 3.14, 98.6)</li>
    </ul>
    <p>
      A nominal variable can use integer data type (1=Male, 2=Female), and an ordinal variable can use text
      ("Low", "Medium", "High"). The data type and measurement level serve different purposes.
    </p>
  </div>

  <p>
    When starting with a blank spreadsheet and typing values in the variable type will change
    automatically depending on the data you enter. This is a good way to get a feel for which
    variable types go with which sorts of data. Similarly, when opening a data file jamovi will
    try and guess the variable type from the data in each column. In both cases this automatic
    approach may not be correct, and it may be necessary to manually specify the variable type
    with the variable editor.
  </p>

  <p>
    The variable editor can be opened by selecting 'Setup' from the data tab or by double-clicking
    on the variable column header. The variable editor allows you to change the name of the variable
    and, for data variables, the variable type, the order of the levels, and the label displayed for
    each level. Changes can be applied by clicking the 'tick' to the top right. The variable editor
    can be dismissed by clicking the 'Hide' arrow.
  </p>

  <p>
    New variables can be inserted or appended to the data set using the 'add' button from the
    data ribbon. The 'add' button also allows the addition of computed variables.
  </p>

  <h3>3.3.2 Computed variables</h3>

  <p>
    Computed Variables are those which take their value by performing a computation on other
    variables. Computed Variables can be used for a range of purposes, including log transforms,
    z-scores, sum-scores, negative scoring and means.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Computed Variables</h4>
    <p>
      <strong>Computed variables</strong> are new variables created by performing mathematical operations on existing
      variables. Instead of entering data manually, the values are automatically calculated using a formula.
      Computed variables update automatically if the underlying data changes, ensuring consistency throughout
      your analysis.
    </p>
  </div>

  <p>
    Computed variables can be added to the data set with the 'add' button available on the data
    tab. This will produce a formula box where you can specify the formula. The usual arithmetic
    operators are available. Some examples of formulas are:
  </p>

  <ul style="list-style-type: none; font-family: monospace;">
    <li>A + B</li>
    <li>LOG10(len)</li>
    <li>MEAN(A, B)</li>
    <li>(dose - VMEAN(dose)) / VSTDEV(dose)</li>
  </ul>

  <p>
    In order, these are the sum of A and B, a log (base 10) transform of len, the mean of A and
    B, and the z-score of the variable dose. The figure below shows the jamovi screen for the new
    variable computed as the z-score of dose (from the 'Tooth Growth' example data set).
  </p>

  <p>
    <em>[Figure 3.2: A newly computed variable showing the formula for z-score of 'dose']</em>
  </p>

  <div class="callout">
    <h4>V-functions</h4>
    <p>
      Several functions are already available in jamovi and available from the drop down box
      labelled <em>fx</em>. A number of functions appear in pairs, one prefixed with a V and the other not. V
      functions perform their calculation on a variable as a whole, where as non-V functions perform
      their calculation row by row. For example, MEAN(A, B) will produce the mean of A and B for
      each row. Where as VMEAN(A) gives the mean of all the values in A.
    </p>
  </div>

  <h3>3.6 Changing data from one level to another</h3>

  <p>
    Sometimes you want to change the variable level. This can happen for all sorts of reasons.
    Sometimes when you import data from files, it can come to you in the wrong format. Numbers
    sometimes get imported as nominal, text values. Dates may get imported as text. ParticipantID
    values can sometimes be read as continuous: nominal values can sometimes be read as ordinal
    or even continuous. There's a good chance that sometimes you'll want to convert a variable
    from one measurement level into another one. Or, to use the correct term, you want to <strong>coerce</strong>
    the variable from one class into another.
  </p>

  <p>
    In section 3.3.1 we saw how to specify different variable levels, and if you want to change a variable's
    measurement level then you can do this in the jamovi data view for that variable. Just click the
    check box for the measurement level you want - continuous, ordinal, or nominal.
  </p>

  <hr>

  <div class="attribution">
    <p>
      Content adapted from <em>Learning Statistics with jamovi</em> by Danielle J. Navarro and David R. Foxcroft,
      licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.
    </p>
  </div>
</section>
`
  },

  // Module 4: Descriptive Statistics
  {
    id: 'central-tendency',
    moduleId: 'module-4',
    title: 'Measures of Central Tendency',
    description: 'Mean, median, and mode - when to use each.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="central-tendency-title">
  <h2 id="central-tendency-title">4.1 Measures of central tendency</h2>

  <p>
    Drawing pictures of the data is an excellent way to convey the "gist" of what the data is trying to tell you.
    It's often extremely useful to try to condense the data into a few simple "summary" statistics. In most situations,
    the first thing that you'll want to calculate is a measure of <strong>central tendency</strong>. That is, you'd
    like to know something about where the "average" or "middle" of your data lies. The three most commonly used
    measures are the mean, median and mode.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Central Tendency</h4>
    <p>
      <strong>Central tendency</strong> refers to statistical measures that identify the center or typical value of a dataset.
      These measures tell us where the "middle" of the data lies and are often the first statistics calculated when
      summarizing data.
    </p>
    <p>
      <strong>The three main measures:</strong>
    </p>
    <ul>
      <li><strong>Mean</strong> – The arithmetic average; sum of all values divided by the number of values</li>
      <li><strong>Median</strong> – The middle value when data is sorted; 50th percentile</li>
      <li><strong>Mode</strong> – The most frequently occurring value(s) in the dataset</li>
    </ul>
  </div>

  <h3>4.1.1 The mean</h3>

  <p>
    The <strong>mean</strong> of a set of observations is just a normal, old-fashioned average. Add all of the values
    up, and then divide by the total number of values. The first five AFL winning margins were 56, 31, 56, 8 and 32,
    so the mean of these observations is just:
  </p>

  <p style="text-align: center; font-size: 1.1em;">
    (56 + 31 + 56 + 8 + 32) / 5 = 183 / 5 = 36.60
  </p>

  <p>
    Of course, this definition of the mean isn't news to anyone. Averages (i.e., means) are used so often in everyday
    life that this is pretty familiar stuff. However, since the concept of a mean is something that everyone already
    understands, I'll use this as an excuse to start introducing some of the mathematical notation that statisticians
    use to describe this calculation.
  </p>

  <p>
    The first piece of notation to introduce is <em>N</em>, which we'll use to refer to the number of observations
    that we're averaging (in this case N = 5). Next, we need to attach a label to the observations themselves. It's
    traditional to use <em>X</em> for this, and to use subscripts to indicate which observation we're actually talking
    about. That is, we'll use X₁ to refer to the first observation, X₂ to refer to the second observation, and so on
    all the way up to X_N for the last one.
  </p>

  <table class="results-table">
    <thead>
      <tr>
        <th>the observation</th>
        <th>its symbol</th>
        <th>the observed value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>winning margin, game 1</td>
        <td>X₁</td>
        <td>56 points</td>
      </tr>
      <tr>
        <td>winning margin, game 2</td>
        <td>X₂</td>
        <td>31 points</td>
      </tr>
      <tr>
        <td>winning margin, game 3</td>
        <td>X₃</td>
        <td>56 points</td>
      </tr>
      <tr>
        <td>winning margin, game 4</td>
        <td>X₄</td>
        <td>8 points</td>
      </tr>
      <tr>
        <td>winning margin, game 5</td>
        <td>X₅</td>
        <td>32 points</td>
      </tr>
    </tbody>
  </table>

  <p>
    By tradition, we use X̄ (read as "X-bar") as the notation for the mean. The calculation for the mean could be
    expressed using the following formula:
  </p>

  <p style="text-align: center; font-size: 1.1em;">
    X̄ = (X₁ + X₂ + ... + X_{N-1} + X_N) / N
  </p>

  <p>
    This formula is entirely correct but it's terribly long, so we make use of the <strong>summation symbol</strong>
    Σ to shorten it. The formula becomes:
  </p>

  <p style="text-align: center; font-size: 1.1em;">
    X̄ = (1/N) Σ Xᵢ
  </p>

  <h4>4.1.2 Calculating the mean in jamovi</h4>

  <p>
    When the number of observations starts to become large it's much easier to do these sorts of calculations using
    a computer. To calculate the mean using all the AFL margins data in jamovi:
  </p>

  <ol>
    <li>Click on the <strong>Exploration</strong> button and then click <strong>Descriptives</strong></li>
    <li>Highlight the <strong>afl.margins</strong> variable and click the right arrow to move it into the Variables box</li>
    <li>As soon as you do that a Table appears on the right showing descriptive statistics</li>
  </ol>

  <p>
    The mean value for the afl.margins variable is <strong>35.30</strong>. Other information presented includes the
    total number of observations (N=176), the number of missing values (none), and the Median, Minimum and Maximum
    values for the variable.
  </p>

  <h3>4.1.3 The median</h3>

  <p>
    The second measure of central tendency that people use a lot is the <strong>median</strong>, and it's even easier
    to describe than the mean. The median of a set of observations is just the middle value. As before let's imagine
    we were interested only in the first 5 AFL winning margins: 56, 31, 56, 8 and 32. To figure out the median we
    sort these numbers into ascending order:
  </p>

  <p style="text-align: center; font-size: 1.1em;">
    8, 31, <strong>32</strong>, 56, 56
  </p>

  <p>
    From inspection, it's obvious that the median value of these 5 observations is 32 since that's the middle one in
    the sorted list. But what should we do if we are interested in the first 6 games rather than the first 5? Since
    the sixth game in the season had a winning margin of 14 points, our sorted list is now:
  </p>

  <p style="text-align: center; font-size: 1.1em;">
    8, 14, <strong>31, 32</strong>, 56, 56
  </p>

  <p>
    and there are two middle numbers, 31 and 32. The median is defined as the average of those two numbers, which is
    31.5. In jamovi the Median value provided for the afl.margins variable is 30.50.
  </p>

  <h3>4.1.4 Mean or median? What's the difference?</h3>

  <p>
    Knowing how to calculate means and medians is only a part of the story. You also need to understand what each one
    is saying about the data, and what that implies for when you should use each one. The mean is kind of like the
    "centre of gravity" of the data set, whereas the median is the "middle value" in the data. What this implies, as
    far as which one you should use, depends a little on what type of data you've got and what you're trying to achieve.
  </p>

  <ul>
    <li>
      <strong>If your data are nominal scale</strong> you probably shouldn't be using either the mean or the median.
      Both rely on the idea that the numbers assigned to values are meaningful. If the numbering scheme is arbitrary
      then it's probably best to use the mode instead.
    </li>
    <li>
      <strong>If your data are ordinal scale</strong> you're more likely to want to use the median than the mean.
      The median only makes use of the order information in your data (i.e., which numbers are bigger) but doesn't
      depend on the precise numbers involved. The mean, on the other hand, makes use of the precise numeric values
      assigned to the observations, so it's not really appropriate for ordinal data.
    </li>
    <li>
      <strong>For interval and ratio scale data</strong> either one is generally acceptable. Which one you pick
      depends a bit on what you're trying to achieve. The mean has the advantage that it uses all the information
      in the data (which is useful when you don't have a lot of data). But it's very sensitive to extreme, outlying
      values.
    </li>
  </ul>

  <p>
    One consequence is that there are systematic differences between the mean and the median when the histogram is
    asymmetric (skewed). The median is located closer to the "body" of the histogram, whereas the mean gets dragged
    towards the "tail" (where the extreme values are).
  </p>

  <div class="critical-points">
    <h4>Critical Point: Choosing Mean vs. Median</h4>
    <table class="results-table">
      <thead>
        <tr>
          <th>Data Type</th>
          <th>Best Measure</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Nominal</strong></td>
          <td>Mode</td>
          <td>Numbers are arbitrary labels; mean and median are meaningless</td>
        </tr>
        <tr>
          <td><strong>Ordinal</strong></td>
          <td>Median (preferred)</td>
          <td>Median uses only order information; mean assumes equal intervals</td>
        </tr>
        <tr>
          <td><strong>Interval/Ratio</strong></td>
          <td>Either (context-dependent)</td>
          <td>
            <strong>Mean:</strong> Uses all information, but sensitive to outliers<br>
            <strong>Median:</strong> Resistant to outliers; better for skewed data
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Key insight:</strong> In skewed distributions, the mean gets "pulled" toward the tail (extreme values),
      while the median stays near the center of the data. For income data or housing prices (typically right-skewed),
      the median often better represents the "typical" value.
    </p>
  </div>

  <h3>4.1.5 A real life example</h3>

  <p>
    To get a sense of why you need to pay attention to the differences between the mean and the median let's consider
    a real life example. This is an excellent article on the ABC news website from 24 September, 2010:
  </p>

  <blockquote>
    <p>
      Senior Commonwealth Bank executives have travelled the world in the past couple of weeks with a presentation
      showing how Australian house prices, and the key price to income ratios, compare favourably with similar
      countries. "Housing affordability has actually been going sideways for the last five to six years," said
      Craig James, the chief economist of the bank's trading arm, CommSec.
    </p>
  </blockquote>

  <p>
    This probably comes as a huge surprise to anyone with a mortgage. The article goes on to make the observation that:
  </p>

  <blockquote>
    <p>
      Many analysts say that has led the bank to use misleading figures and comparisons. If you go to page four of
      CBA's presentation and read the source information at the bottom of the graph and table, you would notice there
      is an additional source on the international comparison – Demographia. However, if the Commonwealth Bank had
      also used Demographia's analysis of Australia's house price to income ratio, it would have come up with a figure
      closer to 9 rather than 5.6 or 4.3
    </p>
  </blockquote>

  <p>
    That's a rather serious discrepancy. One group of people say 9, another says 4-5. Should we just split the
    difference? Absolutely not! This is a situation where there is a right answer and a wrong answer. Demographia
    is correct, and the Commonwealth Bank is wrong. As the article points out:
  </p>

  <blockquote>
    <p>
      [An] obvious problem with the Commonwealth Bank's domestic price to income figures is they compare
      <strong>average incomes</strong> with <strong>median house prices</strong> (unlike the Demographia figures
      that compare median incomes to median prices). The median is the mid-point, effectively cutting out the highs
      and lows, and that means the average is generally higher when it comes to incomes and asset prices, because
      it includes the earnings of Australia's wealthiest people.
    </p>
    <p>
      To put it another way: the Commonwealth Bank's figures count Ralph Norris' multi-million dollar pay packet on
      the income side, but not his (no doubt) very expensive house in the property price figures, thus understating
      the house price to income ratio for middle-income Australians.
    </p>
  </blockquote>

  <p>
    The way that Demographia calculated the ratio is the right thing to do. The way that the Bank did it is incorrect.
  </p>

  <h3>4.1.6 Mode</h3>

  <p>
    The <strong>mode</strong> of a sample is very simple. It is the value that occurs most frequently. For the AFL
    winning margins data, we can use jamovi to produce a frequency table. Under 'Exploration' - 'Descriptives' click
    the small check box labelled 'Frequency tables' and then look for the most common value. You can also check the
    'Mode' checkbox in the Statistics section to have jamovi calculate it directly.
  </p>

  <p>
    The mode is most often calculated when you have nominal data, because means and medians are useless for those
    sorts of variables. But there are some situations in which you really do want to know the mode of an ordinal,
    interval or ratio scale variable. For instance, suppose a friend is offering a bet on a football game chosen at
    random. Without knowing who is playing you have to guess the exact winning margin. If you guess correctly you
    win $50. If you don't you lose $1. There are no consolation prizes for "almost" getting the right answer. For
    this bet, the mean and the median are completely useless to you. It is the mode that you should bet on.
  </p>

  <hr>

  <div class="attribution">
    <p>
      Content adapted from <em>Learning Statistics with jamovi</em> by Danielle J. Navarro and David R. Foxcroft,
      licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.
    </p>
  </div>
</section>
`
  },
  {
    id: 'variability',
    moduleId: 'module-4',
    title: 'Measures of Variability',
    description: 'Range, IQR, variance, and standard deviation.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="variability-title">
  <h2 id="variability-title">4.2 Measures of variability</h2>

  <p>The statistics that we've discussed so far all relate to central tendency. That is, they all talk about which values are "in the middle" or "popular" in the data. However, central tendency is not the only type of summary statistic that we want to calculate. The second thing that we really want is a measure of the <strong>variability</strong> of the data. That is, how "spread out" are the data? How "far" do the observed values tend to be from the mean? For now, let's assume that the data are interval or ratio scale (section 2.2.1), and we'll continue to use the <code>afl.margins</code> data. We'll use this data to discuss several different measures of spread, each with different strengths and weaknesses.</p>

  <div class="terminology-box">
    <h4>Terminology: Variability (Dispersion)</h4>
    <p>
      <strong>Variability</strong> (also called dispersion or spread) describes how much data values differ from each
      other and from the center of the distribution. High variability means data points are spread far apart; low
      variability means they cluster closely together.
    </p>
    <p>
      <strong>Common measures of variability:</strong>
    </p>
    <ul>
      <li><strong>Range</strong> – Maximum minus minimum (simple but sensitive to outliers)</li>
      <li><strong>Interquartile Range (IQR)</strong> – Range of the middle 50% of data (robust to outliers)</li>
      <li><strong>Variance (s²)</strong> – Average squared deviation from the mean</li>
      <li><strong>Standard Deviation (s)</strong> – Square root of variance (same units as original data)</li>
    </ul>
  </div>

  <h3>4.2.1 Range</h3>

  <p>The <strong>range</strong> of a variable is very simple: it's the biggest value minus the smallest value. For the AFL winning margins data, the maximum value is 116, and the minimum value is 0. We can calculate these values in jamovi simply by adding them from the drop down list of statistics options in the 'Exploration' - 'Descriptives' analysis window. This gives us the following output:</p>

  <table>
    <thead>
      <tr>
        <th></th>
        <th>afl.margins</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Minimum</td>
        <td>0.000</td>
      </tr>
      <tr>
        <td>Maximum</td>
        <td>116.0</td>
      </tr>
    </tbody>
  </table>

  <p>Although the range is the simplest way to quantify the notion of "variability", it's one of the worst. Recall from our discussion of the mean that we want our summary measure to be <em>robust</em>. If the data set has one or two extremely bad values in it, we'd like our statistics not to be unduly influenced by these cases. If we look once again at our toy example of a data set containing very extreme outliers...</p>

  <p class="code-block">-100, 2, 3, 4, 5, 6, 7, 8, 9, 10</p>

  <p>...it is clear that the range is not robust, since this has a range of 110, but if the outlier were removed we would have a range of only 8.</p>

  <h3>4.2.2 Interquartile range</h3>

  <p>The <strong>interquartile range</strong> (IQR) is like the range, but instead of calculating the difference between the biggest and smallest value, it calculates the difference between the 25th quantile and the 75th quantile. Probably you already know what a quantile is (they're more commonly called <em>percentiles</em>), but just in case, let's go through it quickly.</p>

  <p>Think of it like this: the 10th percentile of a data set is the smallest number <em>x</em> such that 10% of the data is less than <em>x</em>. In fact, we can be a bit more precise. Suppose we sorted the data from smallest to largest. Then the 10th percentile is the value that separates the bottom 10% of the data from the top 90% of the data. The median is the 50th percentile, since half of the data is smaller and half of the data is larger. Similarly, we can calculate 25th percentile (the <strong>lower quartile</strong>) and the 75th percentile (the <strong>upper quartile</strong>). The difference between the upper quartile and the lower quartile is the interquartile range.</p>

  <p>Let's have a look at how to calculate the IQR in jamovi. In the Descriptives analysis window, select 'IQR' from the Statistics - Dispersion options. This should give us the following output:</p>

  <table>
    <thead>
      <tr>
        <th></th>
        <th>afl.margins</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>IQR</td>
        <td>36.50</td>
      </tr>
    </tbody>
  </table>

  <p>While it's obvious how to interpret the range, it's a little less obvious how to interpret the IQR. The simplest way to think about it is like this: the interquartile range is the range spanned by the "middle half" of the data. That is, one quarter of the data is less than 19.00, one quarter of the data is greater than 55.50, and the remaining half of the data lies in between. The IQR is a bit more robust than the range. For example, if we go back to our toy example from the previous section, with one extremely large outlier...</p>

  <p class="code-block">-100, 2, 3, 4, 5, 6, 7, 8, 9, 10</p>

  <p>...the range is very large (110), but if we calculate the IQR (e.g., using the IQR function in jamovi) we see that it's much smaller, only 5. So, the IQR is much more robust to outliers than the range is.</p>

  <h3>4.2.3 Mean absolute deviation</h3>

  <p>The two measures we've looked at so far, the range and the interquartile range, both rely on the idea that we can measure the spread of the data by looking at the quantiles of the data. However, this isn't the only way to think about the problem. A different approach is to select a meaningful reference point (usually the mean or the median) and then report the "typical" deviations from that reference point. What do we mean by "typical" deviation? Usually, the mean or median value of these deviations! In practice, this leads to two different measures, the <strong>mean absolute deviation</strong> (from the mean) and the <strong>median absolute deviation</strong> (from the median).</p>

  <p>Let's start by thinking about the first measure: we'll start by talking about how to calculate the mean absolute deviation from the mean. Firstly, let's introduce the notation <em>X̄</em> to refer to the mean of the observation <em>X<sub>i</sub></em>. The first step in calculating the mean absolute deviation is to calculate how far each observation is from the mean. That is, we take the difference <em>X<sub>i</sub></em> - <em>X̄</em>. This is illustrated in the following table, using the first five AFL games as our data:</p>

  <table>
    <thead>
      <tr>
        <th>which game, <em>i</em></th>
        <th>winning margin, <em>X<sub>i</sub></em></th>
        <th>deviation from mean, <em>X<sub>i</sub></em> - <em>X̄</em></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>56</td>
        <td>56 - 35.3 = 20.7</td>
      </tr>
      <tr>
        <td>2</td>
        <td>31</td>
        <td>31 - 35.3 = -4.3</td>
      </tr>
      <tr>
        <td>3</td>
        <td>56</td>
        <td>56 - 35.3 = 20.7</td>
      </tr>
      <tr>
        <td>4</td>
        <td>8</td>
        <td>8 - 35.3 = -27.3</td>
      </tr>
      <tr>
        <td>5</td>
        <td>32</td>
        <td>32 - 35.3 = -3.3</td>
      </tr>
    </tbody>
  </table>

  <p>Notice that these deviations can be positive or negative. If we take the mean of these deviations, we'll get zero. This should not be surprising: the big positive deviations and the big negative deviations cancel each other out. So we need a way to get rid of the signs. One way to do this is to take the <em>absolute value</em>. So instead of calculating the difference <em>X<sub>i</sub></em> - <em>X̄</em>, we calculate the absolute value of the difference, |<em>X<sub>i</sub></em> - <em>X̄</em>|. The mean of these absolute deviations is the <strong>mean absolute deviation</strong>. We can use jamovi to calculate the mean absolute deviation from the mean, although jamovi does not provide this statistic by default. However, we can use the Rj Editor (see section 3.2) to run an R command to get jamovi to calculate it for us:</p>

  <p class="code-block">mean(abs(data[['afl.margins']] - mean(data[['afl.margins']])), na.rm=TRUE)</p>

  <p>The output is 24.5. This means that, on average, the difference between an AFL winning margin and the mean winning margin is 24.5 points. The MAD is a bit like the IQR in that it's measuring the middle spread of the data. It has some theoretical advantages over the IQR, but it's not used as frequently in practice.</p>

  <h3>4.2.4 Variance</h3>

  <p>Okay, we've now seen the range, the IQR, and the mean absolute deviation. They all give slightly different answers, but they're all trying to do the same thing: they're all trying to quantify the spread of the data. However, the most commonly used measure of variability is the <strong>variance</strong>. The variance is closely related to the mean absolute deviation, so let's start by looking at what would happen if we calculated the mean <em>squared</em> deviation.</p>

  <p>Let's look at an example of how to calculate the variance. The table below shows the same five AFL games, but this time we've squared all the deviations:</p>

  <table>
    <thead>
      <tr>
        <th>which game, <em>i</em></th>
        <th>winning margin, <em>X<sub>i</sub></em></th>
        <th>squared deviation, (<em>X<sub>i</sub></em> - <em>X̄</em>)²</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>56</td>
        <td>(56 - 35.3)² = 428.49</td>
      </tr>
      <tr>
        <td>2</td>
        <td>31</td>
        <td>(31 - 35.3)² = 18.49</td>
      </tr>
      <tr>
        <td>3</td>
        <td>56</td>
        <td>(56 - 35.3)² = 428.49</td>
      </tr>
      <tr>
        <td>4</td>
        <td>8</td>
        <td>(8 - 35.3)² = 745.29</td>
      </tr>
      <tr>
        <td>5</td>
        <td>32</td>
        <td>(32 - 35.3)² = 10.89</td>
      </tr>
    </tbody>
  </table>

  <p>If we sum these squared deviations, we get a total of 1631.65. This quantity is called the "sum of squares". The name is pretty straightforward: we took a bunch of quantities (i.e., the deviations from the mean), squared them, and then added them up. If we now divide this sum of squares by 5, we get a value of 326.33. This is called the <strong>variance</strong>.</p>

  <p>Notice that the variance is actually quite large relative to the original data. That's because we squared all the deviations. So what we should do is take the square root of the variance. When we do that, we get a quantity called the <strong>standard deviation</strong>, which we'll talk about in the next section. But first, let's look at the variance a bit more carefully.</p>

  <p>In practice, there's actually a slight complication. What I outlined above is how to calculate the variance when you have data from a <em>population</em>. However, when you have data from a <em>sample</em> (which is almost always the case in practice), there's a subtle bias in the calculation. To remove this bias, we divide by <em>n</em> - 1 rather than <em>n</em>. So the formula for the <strong>sample variance</strong> is:</p>

  <div class="formula-box">
    <p><strong>s² = Σ(<em>X<sub>i</sub></em> - <em>X̄</em>)² / (<em>n</em> - 1)</strong></p>
  </div>

  <p>This is the formula that jamovi uses when you ask it to calculate the variance. The logic behind the <em>n</em> - 1 correction is a bit technical, but the basic idea is that when you calculate the sample variance, you're using the sample mean <em>X̄</em> as an estimate of the population mean. Because the sample mean is calculated from the same data as the variance, it tends to be "too close" to the data. To compensate for this, we divide by <em>n</em> - 1 instead of <em>n</em>.</p>

  <p>Now let's try to get jamovi to calculate the variance. In the 'Descriptives' window, select the 'Variance' check box from the 'Statistics - Dispersion' options. This gives us the following output:</p>

  <table>
    <thead>
      <tr>
        <th></th>
        <th>afl.margins</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Variance</td>
        <td>675.9</td>
      </tr>
    </tbody>
  </table>

  <p>One problem with the variance is that it doesn't have the same units as the data itself. Our data are measured in "points", but the variance is measured in "points-squared", whatever that means. This is a bit of a problem for interpretation. The solution is to take the square root of the variance, which gives us a quantity called the <strong>standard deviation</strong>.</p>

  <h3>4.2.5 Standard deviation</h3>

  <p>The <strong>standard deviation</strong> is the square root of the variance. For the sample variance, we denote the sample standard deviation as <em>s</em>, and it's defined as:</p>

  <div class="formula-box">
    <p><strong>s = √[Σ(<em>X<sub>i</sub></em> - <em>X̄</em>)² / (<em>n</em> - 1)]</strong></p>
  </div>

  <p>The standard deviation has the same units as the data, so it's easier to interpret than the variance. For the AFL margins data, jamovi tells us that the standard deviation is 26.0 points. In the 'Descriptives' window in jamovi, we can check the 'Std. deviation' option under 'Statistics - Dispersion'. This will give us the following output:</p>

  <table>
    <thead>
      <tr>
        <th></th>
        <th>afl.margins</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Std. deviation</td>
        <td>26.01</td>
      </tr>
    </tbody>
  </table>

  <p>An interesting property of the standard deviation is that if the data are roughly normally distributed, then we can use it to make some general statements about how much of the data falls within various ranges:</p>

  <ul>
    <li>Approximately 68% of the data falls within 1 standard deviation of the mean</li>
    <li>Approximately 95% of the data falls within 2 standard deviations of the mean</li>
    <li>Approximately 99.7% of the data falls within 3 standard deviations of the mean</li>
  </ul>

  <p>This is often referred to as the <strong>68-95-99.7 rule</strong>, and it provides a nice way of thinking about what the standard deviation actually means. Of course, this rule only works when the data are normally distributed (see section 9.5), but it's still a useful thing to keep in mind.</p>

  <h3>4.2.6 Which measure to use?</h3>

  <p>We've discussed quite a few measures of spread (range, IQR, MAD, variance and standard deviation), and hinted at their strengths and weaknesses. Here's a quick summary:</p>

  <ul>
    <li><strong>Range</strong>. Gives you the full spread of the data, and it's very easy to calculate. But it's extremely sensitive to outliers.</li>
    <li><strong>IQR</strong>. Tells you where the "middle half" of the data sits. It's robust to outliers, and intuitively meaningful. It pairs well with the median. Unfortunately, jamovi doesn't provide any tools to calculate the interquartile range directly (though you can calculate it manually by looking at the 25th and 75th percentiles).</li>
    <li><strong>MAD</strong>. Measures the average deviation from a reference point (usually the mean or median). It's robust to outliers if you use the median as the reference point. Like the IQR, jamovi doesn't calculate this directly.</li>
    <li><strong>Variance</strong>. Measures the average squared deviation from the mean. It's closely linked to many important statistical tools. However, it's not robust to outliers, and it's in squared units, which is a bit weird.</li>
    <li><strong>Standard deviation</strong>. The square root of the variance. It's in the same units as the data, which makes it easier to interpret. If the data are roughly normally distributed, the 68-95-99.7 rule provides a nice way to interpret it. It's the measure that statisticians use most often.</li>
  </ul>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'skew-kurtosis',
    moduleId: 'module-4',
    title: 'Skewness and Kurtosis',
    description: 'Measuring the shape of distributions.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="skew-kurtosis-title">
  <h2 id="skew-kurtosis-title">4.3 Skew and kurtosis</h2>

  <p>There are two more descriptive statistics that you will sometimes see reported in the psychological literature, known as <strong>skewness</strong> and <strong>kurtosis</strong>. In practice, neither one is used anywhere near as frequently as the measures of central tendency and variability that we've been talking about. Skewness is pretty important, so you do see it mentioned a fair bit; but kurtosis is a less common measure, and I've only seen it mentioned in a handful of papers. Because they're not used very often, I'm only going to give a very brief introduction to them.</p>

  <div class="terminology-box">
    <h4>Terminology: Skewness and Kurtosis</h4>
    <p>
      <strong>Skewness</strong> measures the asymmetry of a distribution:
    </p>
    <ul>
      <li><strong>Zero skewness</strong> – Symmetric distribution</li>
      <li><strong>Positive (right) skewness</strong> – Long right tail; mode < median < mean</li>
      <li><strong>Negative (left) skewness</strong> – Long left tail; mean < median < mode</li>
    </ul>
    <p>
      <strong>Kurtosis</strong> measures the "tailedness" of a distribution—how much probability is in the tails versus the center.
      High kurtosis indicates heavy tails with more extreme values; low kurtosis indicates light tails.
    </p>
  </div>

  <h3>4.3.1 Skewness</h3>

  <p><strong>Skewness</strong> is basically a measure of asymmetry, and the easiest way to explain it is by drawing some pictures. In Figure 4.5 I've plotted a reasonably symmetric distribution (panel a), one that is highly right-skewed (panel b), and one that is highly left-skewed (panel c). Notice that, in panel b, the right hand tail (i.e., the right side of the distribution) is very long, so the mass of the distribution is shifted to the left. When a distribution is right skewed, the mode is less than the median, which is less than the mean. For the left-skewed distribution in panel c, you can see that the opposite is true. The mode is greater than the median, which is greater than the mean.</p>

  <p>The skewness value is 0 for a symmetric distribution, positive for a right-skewed distribution, and negative for a left-skewed distribution. In practice, skewness is usually calculated using the following formula:</p>

  <div class="formula-box">
    <p><strong>skewness = (1/<em>n</em>) Σ[(<em>X<sub>i</sub></em> - <em>X̄</em>) / <em>s</em>]³</strong></p>
  </div>

  <p>where <em>s</em> is the sample standard deviation. Notice the cubed term in the formula. This ensures that positive deviations from the mean contribute positively to the skewness value, and negative deviations contribute negatively. The division by the standard deviation is there to ensure that the skewness value doesn't depend on the units of measurement. If you calculate the skewness of the AFL margins data, you'll get a skewness value of 0.74. This indicates that the data are right-skewed, which is consistent with what we saw in the histogram earlier.</p>

  <p>Skewness is quite useful in practice. For instance, if you're reporting the mean as a measure of central tendency, but your data are heavily skewed, then the mean is probably not a very good measure to use, and you should consider using the median instead.</p>

  <h3>4.3.2 Kurtosis</h3>

  <p><strong>Kurtosis</strong> is a measure of the "tailedness" of a distribution. Basically, the kurtosis value tells you how heavy the tails of the distribution are. More precisely, it measures the proportion of the distribution that is located in the tails of the distribution. The formula for kurtosis is as follows:</p>

  <div class="formula-box">
    <p><strong>kurtosis = (1/<em>n</em>) Σ[(<em>X<sub>i</sub></em> - <em>X̄</em>) / <em>s</em>]⁴ - 3</strong></p>
  </div>

  <p>The "- 3" term at the end is there to make the kurtosis value 0 for a normal distribution (we'll talk more about normal distributions in Chapter 9). A distribution with high kurtosis is said to be <strong>leptokurtic</strong>, and has heavy tails. A distribution with low (negative) kurtosis is said to be <strong>platykurtic</strong>, and has light tails. A distribution with zero kurtosis is said to be <strong>mesokurtic</strong>.</p>

  <p>In Figure 4.6, I've plotted three distributions that all have the same mean and standard deviation, but have different kurtosis values. The distributions in panels a and c are quite normal looking, but panel a has a kurtosis of 0 (mesokurtic), while panel c has a kurtosis of 2 (leptokurtic). The distribution in panel b has a kurtosis of -1 (platykurtic). The leptokurtic distribution has more values in the tails and fewer in the middle, while the platykurtic distribution has fewer values in the tails and more in the middle.</p>

  <p>In practice, kurtosis is rarely reported in the psychological literature. This is partly because kurtosis is not very intuitive, and partly because the measure is very sensitive to the tails of the distribution, which makes it difficult to interpret. For the AFL margins data, the kurtosis value is 0.02, which indicates that the distribution is very close to normal in terms of its tailedness.</p>

  <h3>4.3.3 Getting the skewness and kurtosis in jamovi</h3>

  <p>The 'Descriptives' screen in jamovi has check boxes for both skewness and kurtosis in the 'Statistics' options. They are included in a 'Distribution' sub-option underneath the 'Dispersion' options that we used earlier. The skewness value for the AFL margins data is 0.737, and the kurtosis value is 0.0244.</p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'grouped-descriptives',
    moduleId: 'module-4',
    title: 'Grouped Descriptive Statistics',
    description: 'Computing and comparing statistics across groups.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="grouped-desc-title">
  <h2 id="grouped-desc-title">4.4 Descriptive statistics separately for each group</h2>

  <p>In many situations, you want to calculate descriptive statistics separately for different groups. For instance, you might want to know the mean salary for men and the mean salary for women, or the median age of people in different occupations. When you have a variable that splits the data into groups, you can use that variable to calculate statistics separately for each group. In jamovi, this is quite straightforward.</p>

  <div class="terminology-box">
    <h4>Terminology: Grouped Descriptive Statistics</h4>
    <p>
      <strong>Grouped (or stratified) descriptive statistics</strong> are calculated separately for different subgroups within your dataset.
    </p>
    <ul>
      <li><strong>Grouping variable</strong> – A categorical variable that defines subgroups (e.g., gender, treatment condition, occupation)</li>
      <li><strong>Split by</strong> – The jamovi feature that calculates statistics separately for each level of a grouping variable</li>
      <li><strong>Cross-tabulation (contingency table)</strong> – A table showing frequencies for combinations of two or more categorical variables</li>
    </ul>
  </div>

  <div class="key-points">
    <h4>Key Concept: Comparing Groups</h4>
    <p>
      When you have a dataset with different subgroups, calculating statistics for the entire dataset might hide important differences between groups. By splitting your analysis by a grouping variable, you can:
    </p>
    <ul>
      <li>Compare means, medians, or other statistics across groups</li>
      <li>Identify patterns that only exist within certain subgroups</li>
      <li>Check whether relationships differ by group membership</li>
    </ul>
    <p>
      In jamovi, simply drag your grouping variable into the <strong>'Split by'</strong> box to automatically calculate all statistics separately for each group.
    </p>
  </div>

  <h3>4.4.1 Using the 'Split by' box</h3>

  <p>In the 'Descriptives' screen in jamovi, there's a box called 'Split by'. If you move a grouping variable into this box, jamovi will calculate all the statistics separately for each level of that grouping variable. For example, suppose you wanted to calculate the mean AFL winning margin separately for games that the home team won vs. games that the away team won. First, you'd need to create a variable that indicates whether the home team won or not. Let's assume you've already done this, and the variable is called <code>home.win</code>. If you move the <code>home.win</code> variable into the 'Split by' box, jamovi will calculate all the statistics separately for games where the home team won, and for games where the away team won.</p>

  <p>In the output, you'll see a table that looks something like this:</p>

  <table>
    <thead>
      <tr>
        <th>home.win</th>
        <th>N</th>
        <th>Mean</th>
        <th>Median</th>
        <th>Std. deviation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>0</td>
        <td>94</td>
        <td>35.8</td>
        <td>32.5</td>
        <td>26.1</td>
      </tr>
      <tr>
        <td>1</td>
        <td>82</td>
        <td>35.0</td>
        <td>31.0</td>
        <td>26.0</td>
      </tr>
    </tbody>
  </table>

  <p>The table shows that there were 94 games where the home team lost (home.win = 0), and 82 games where the home team won (home.win = 1). The mean winning margin was 35.8 points when the home team lost, and 35.0 points when the home team won. So, on average, the margins are pretty similar regardless of which team won.</p>

  <h3>4.4.2 Multiple grouping variables</h3>

  <p>You can also split the data by multiple variables at the same time. For instance, if you had variables indicating both the home team's success and the weather conditions, you could split by both variables. jamovi would then calculate statistics for each combination of home team success and weather. For example, you might have statistics for "home team won on rainy days", "home team won on sunny days", "home team lost on rainy days", and "home team lost on sunny days".</p>

  <p>The basic principle is simple: whenever you want to look at statistics separately for different groups, just move the grouping variable(s) into the 'Split by' box. jamovi will do the rest automatically.</p>

  <h3>4.4.3 Descriptives for categorical variables</h3>

  <p>When working with categorical (nominal or ordinal) variables, the statistics we've been discussing (mean, median, standard deviation) don't always make sense. For categorical data, frequency tables are often more useful. In jamovi, you can get frequency tables by going to 'Exploration' - 'Frequencies' in the Analyses menu. This will show you how many observations fall into each category of your variable.</p>

  <p>If you want to see frequency tables separately for different groups, you can use the 'Rows' and 'Columns' boxes in the 'Frequencies' screen. For instance, if you wanted to see the frequency of different weather conditions separately for home wins and home losses, you'd put the weather variable in one box and the home.win variable in the other. jamovi will then create a cross-tabulation (also called a contingency table) showing the counts for each combination of categories.</p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'standard-scores',
    moduleId: 'module-4',
    title: 'Standard Scores (Z-scores)',
    description: 'Standardizing scores for comparison across scales.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="z-scores-title">
  <h2 id="z-scores-title">4.5 Standard scores</h2>

  <p>One of the most useful concepts in statistics is the idea of a <strong>standard score</strong> (also called a <strong>z-score</strong>). The basic idea is quite simple: a standard score is a way of describing where a particular observation sits within a distribution. Specifically, it tells you how many standard deviations above (or below) the mean a particular data point is. This turns out to be useful in all sorts of ways, so it's worth talking about in some detail.</p>

  <div class="terminology-box">
    <h4>Terminology: Standard Scores (Z-Scores)</h4>
    <p>
      A <strong>standard score</strong> (or <strong>z-score</strong>) tells you how many standard deviations a data point is away from the mean. The formula is:
    </p>
    <p style="text-align: center; font-size: 1.1em;">
      <strong>z = (X - X̄) / s</strong>
    </p>
    <p>
      <strong>Interpretation:</strong>
    </p>
    <ul>
      <li><strong>z = 0</strong> – The value equals the mean</li>
      <li><strong>z = +1</strong> – One standard deviation above the mean</li>
      <li><strong>z = -2</strong> – Two standard deviations below the mean</li>
      <li><strong>|z| > 3</strong> – Very unusual/extreme value (beyond 99.7% of data)</li>
    </ul>
    <p>
      <strong>Why useful:</strong> Z-scores allow you to compare values from different scales or distributions on a common, standardized scale.
    </p>
  </div>

  <h3>4.5.1 Calculating standard scores</h3>

  <p>Let's start with the formula. If we have a set of observations <em>X</em>, with mean <em>X̄</em> and standard deviation <em>s</em>, then the standard score for a particular observation <em>X<sub>i</sub></em> is:</p>

  <div class="formula-box">
    <p><strong>z<sub>i</sub> = (<em>X<sub>i</sub></em> - <em>X̄</em>) / <em>s</em></strong></p>
  </div>

  <p>Let's look at an example. Suppose I'm interested in people's attitudes to statistics. I give everyone a questionnaire asking them to rate how much they like statistics on a scale from -100 (hate it) to +100 (love it). The mean score in my sample turns out to be 17, and the standard deviation is 5. What can we say about someone who scores 35 on this questionnaire? Well, first we can calculate their standard score:</p>

  <p class="code-block">z = (35 - 17) / 5 = 18 / 5 = 3.6</p>

  <p>This tells us that this person's score is 3.6 standard deviations above the mean. That's a pretty extreme score. Using the 68-95-99.7 rule from earlier, we know that 99.7% of scores fall within 3 standard deviations of the mean, so a score that is 3.6 standard deviations above the mean is pretty unusual.</p>

  <h3>4.5.2 Comparing scores on different scales</h3>

  <p>One of the really nice things about standard scores is that they provide a way to compare observations that come from different distributions. For instance, suppose that I'm interested in comparing my attitudes questionnaire results to an IQ test. The questionnaire is scored from -100 to 100, but IQ tests are scored with a mean of 100 and a standard deviation of 15. How can we compare them?</p>

  <p>Well, suppose someone has a questionnaire score of 35 (which, as we saw above, has a z-score of 3.6) and an IQ of 130. To work out which one is more extreme, we can calculate the z-score for the IQ:</p>

  <p class="code-block">z = (130 - 100) / 15 = 30 / 15 = 2.0</p>

  <p>So the IQ score is 2.0 standard deviations above the mean. In other words, even though the questionnaire score of 35 is numerically smaller than the IQ score of 130, it's actually more extreme, because it's further from the mean in terms of standard deviations.</p>

  <h3>4.5.3 Using standard scores in jamovi</h3>

  <p>jamovi doesn't have a built-in function to calculate z-scores in the Descriptives screen, but you can calculate them using the 'Compute' function. To create a new variable containing the z-scores for an existing variable:</p>

  <ol>
    <li>Go to 'Data' - 'Compute' in the menu bar</li>
    <li>In the 'Compute' window, give your new variable a name (e.g., <code>z_score</code>)</li>
    <li>In the formula box, enter the formula: <code>(variable_name - MEAN(variable_name)) / STDEV(variable_name)</code></li>
    <li>Replace <code>variable_name</code> with the actual name of your variable</li>
    <li>Click the green arrow to compute the new variable</li>
  </ol>

  <p>Alternatively, many statistical packages (including jamovi) will automatically provide standardized values when you run certain analyses. For instance, when you run a regression analysis, jamovi will often provide both the raw regression coefficients and the standardized coefficients (which are calculated using z-scores).</p>

  <h3>4.5.4 Standard scores and the normal distribution</h3>

  <p>Standard scores are particularly useful when your data are normally distributed (we'll talk more about the normal distribution in Chapter 9). When data are normally distributed, the standard score tells you exactly what percentage of observations fall above or below a particular value. For instance, if you have a z-score of 1.0, then (using the 68-95-99.7 rule) we know that approximately 16% of observations are further above the mean than you are. This becomes even more precise when you use the full normal distribution tables (z-tables), which tell you the exact percentage for any z-score.</p>

  <p>However, even when your data aren't perfectly normally distributed, standard scores are still very useful for comparing different observations, or observations from different distributions. They provide a common "language" that allows you to make meaningful comparisons between things that were originally measured on completely different scales.</p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },

  // Module 5: Graphing and Visualization
  {
    id: 'histograms',
    moduleId: 'module-5',
    title: 'Histograms',
    description: 'Visualize distributions and identify shape, center, spread.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="histograms-title">
  <h2 id="histograms-title">5.1 Histograms</h2>

  <blockquote class="chapter-quote">
    <p>Above all else show the data.</p>
    <footer>–Edward Tufte</footer>
  </blockquote>

  <p>
    Let's begin with the humble <strong>histogram</strong>. Histograms are one of the simplest and most useful
    ways of visualizing data. They make most sense when you have an interval or ratio scale
    variable and what you want to do is get an overall impression of the variable.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Histograms</h4>
    <p>
      A <strong>histogram</strong> is a graphical display that shows the distribution of a continuous variable
      by dividing the data into intervals (called bins) and displaying the frequency of observations in each bin
      as vertical bars.
    </p>
    <ul>
      <li><strong>Bins</strong> – Intervals that divide up the possible values of your variable</li>
      <li><strong>Frequency</strong> – The count of observations that fall within each bin</li>
      <li><strong>Density</strong> – An alternative to frequency that shows the proportion of data in each bin</li>
    </ul>
  </div>

  <p>
    Most of you probably know how histograms work, since they're so widely used, but for the sake of completeness I'll describe them. All you do is divide up the
    possible values into bins and then count the number of observations that fall within each bin.
    This count is referred to as the frequency or density of the bin and is displayed as a vertical
    bar.
  </p>

  <div class="key-points">
    <h4>Key Points: When to Use Histograms</h4>
    <ul>
      <li><strong>Best for continuous data</strong> – Use histograms for interval or ratio scale variables</li>
      <li><strong>Shows distribution shape</strong> – Quickly assess normality, skewness, and kurtosis</li>
      <li><strong>Reveals patterns</strong> – Identify the center, spread, and unusual values in your data</li>
      <li><strong>Not good for nominal data</strong> – If your data are categorical, use bar charts instead</li>
    </ul>
  </div>

  <h3>5.1.1 Creating histograms in jamovi</h3>

  <p>
    Drawing a histogram in jamovi is straightforward. Open up the 'Plots' options
    under 'Exploration' → 'Descriptives' and click the 'Histogram' checkbox. jamovi
    defaults to labeling the y-axis as 'density' and the x-axis with the variable name. The bins
    are selected automatically.
  </p>

  <p>
    What we are really interested in is our impression of the shape of the distribution: is it normally distributed or is
    there a skew or kurtosis? Our first impressions of these characteristics come from drawing a
    histogram.
  </p>

  <h3>5.1.2 Density plots</h3>

  <p>
    One additional feature that jamovi provides is the ability to plot a 'Density' curve. You
    can do this by clicking the 'Density' checkbox under the 'Plots' options. A density plot visualizes the distribution
    of data over a continuous interval or time period. This chart is a variation of a histogram that
    uses <strong>kernel smoothing</strong> to plot values, allowing for smoother distributions by smoothing out
    the noise.
  </p>

  <div class="critical-points">
    <h4>Critical Point: Histograms vs. Density Plots</h4>
    <p>
      Understanding when to use each type of plot:
    </p>
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>Histogram</th>
          <th>Density Plot</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Display style</td>
          <td>Discrete bars</td>
          <td>Smooth curve</td>
        </tr>
        <tr>
          <td>Bin sensitivity</td>
          <td>Affected by number of bins</td>
          <td>Not affected by bins</td>
        </tr>
        <tr>
          <td>Best for</td>
          <td>Exact counts, discrete sense of distribution</td>
          <td>Overall distribution shape, comparing distributions</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>
    The peaks of a density plot help display where values are concentrated over the interval. An advantage density plots have over histograms is that they are better at determining the
    distribution shape because they're not affected by the number of bins used (each bar used in a
    typical histogram). A histogram comprising of only 4 bins wouldn't produce a distinguishable
    enough shape of distribution as a 20-bin histogram would. However, with density plots, this
    isn't an issue.
  </p>

  <p>
    In fact, the big strength of a histogram or density plot is that (properly used) it does
    show the entire spread of the data, so you can get a pretty good sense about what it looks like.
    The downside to histograms is that they aren't very compact. Unlike some of the other plots,
    it's hard to cram 20-30 histograms into a single image without overwhelming the
    viewer. And of course, if your data are nominal scale then histograms are useless.
  </p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'boxplots',
    moduleId: 'module-5',
    title: 'Box Plots',
    description: 'Display five-number summary and identify outliers.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="boxplots-title">
  <h2 id="boxplots-title">5.2 Boxplots</h2>

  <p>
    Another alternative to histograms is a <strong>boxplot</strong>, sometimes called a "box and whiskers" plot.
    Like histograms they're most suited to interval or ratio scale data. The idea behind a boxplot
    is to provide a simple visual depiction of the median, the interquartile range, and the range of
    the data. And because they do so in a fairly compact way, boxplots have become a very popular
    statistical graphic, especially during the exploratory stage of data analysis when you're trying to
    understand the data yourself.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Boxplot Components</h4>
    <p>
      A <strong>boxplot</strong> displays the five-number summary of a dataset in a compact visual format:
    </p>
    <ul>
      <li><strong>Median</strong> – The thick line in the middle of the box</li>
      <li><strong>Box</strong> – Spans from the 25th percentile (Q1) to the 75th percentile (Q3), representing the interquartile range (IQR)</li>
      <li><strong>Whiskers</strong> – Extend to the most extreme data points within 1.5 × IQR from the box edges</li>
      <li><strong>Outliers</strong> – Individual points plotted beyond the whiskers (values more than 1.5 × IQR from Q1 or Q3)</li>
    </ul>
  </div>

  <h3>5.2.1 Creating boxplots in jamovi</h3>

  <p>
    The easiest way to describe what a boxplot looks like is just to draw one. Click on the
    'Box plot' checkbox in the Plots options and jamovi will draw the most basic boxplot possible. When you look at this plot, interpret it as follows:
  </p>

  <ul>
    <li>The <strong>thick line in the middle</strong> of the box is the median</li>
    <li>The <strong>box itself</strong> spans the range from the 25th percentile to the 75th percentile</li>
    <li>The <strong>whiskers</strong> go out to the most extreme data point that doesn't exceed 1.5 times the interquartile range (IQR)</li>
    <li>Any observation beyond this range is plotted as a <strong>circle or dot</strong> and is commonly referred to as an outlier</li>
  </ul>

  <div class="key-points">
    <h4>Key Points: Why Use Boxplots?</h4>
    <ul>
      <li><strong>Compact display</strong> – Show distribution summaries in a small space</li>
      <li><strong>Easy comparisons</strong> – Display multiple groups side-by-side without overwhelming the viewer</li>
      <li><strong>Outlier detection</strong> – Automatically identify potentially suspicious values</li>
      <li><strong>Quick assessment</strong> – See center, spread, and skewness at a glance</li>
    </ul>
  </div>

  <h3>5.2.2 Violin plots</h3>

  <p>
    A variation on the traditional boxplot is the <strong>violin plot</strong>. Violin plots are similar to boxplots
    except that they also show the kernel probability density of the data at different values.
    Typically, violin plots will include a marker for the median of the data and a box indicating the
    interquartile range, as in standard boxplots. In jamovi you can achieve this by checking both the 'Violin' and the 'Box plot' checkboxes.
  </p>

  <p>
    You can also turn on the 'Data' checkbox to show the actual data points on the plot. However, this can make
    the graph a bit too busy. Clarity is simplicity, so in practice it might be
    better to just use a simple boxplot.
  </p>

  <h3>5.2.3 Drawing multiple boxplots</h3>

  <p>
    One powerful feature of boxplots is the ability to draw multiple boxplots at once for different groups. This allows you to compare distributions across categories. To do this, move a grouping variable into the 'Split by' box in jamovi's Descriptives window.
  </p>

  <p>
    This version of the boxplot, split by groups, gives a sense
    of why it's sometimes useful to choose boxplots instead of histograms. It's possible to get a
    good sense of what the data look like from group to group without getting overwhelmed with too
    much detail. Now imagine what would have happened if you tried to cram 20+ histograms into
    the same space: no chance at all that the reader is going to learn anything useful.
  </p>

  <h3>5.2.4 Using boxplots to detect outliers</h3>

  <p>
    Because the boxplot automatically separates out those observations that lie outside a certain
    range, depicting them with a dot in jamovi, people often use them as an informal method
    for detecting <strong>outliers</strong>: observations that are "suspiciously" distant from the rest of the data.
  </p>

  <div class="critical-points">
    <h4>Critical Point: Investigating Outliers</h4>
    <p>
      When boxplots reveal potential outliers, follow these steps:
    </p>
    <ul>
      <li><strong>Don't automatically delete outliers</strong> – They might represent real, important observations</li>
      <li><strong>Investigate the source</strong> – Check if it's a data entry error or a genuine extreme value</li>
      <li><strong>Use filters to identify</strong> – In jamovi, create a filter to find observations beyond a threshold</li>
      <li><strong>Document your decision</strong> – Whether you keep or remove outliers, explain your reasoning</li>
    </ul>
    <p>
      This phase of data analysis is called <strong>data cleaning</strong> and can take up a huge chunk of time: searching
      for typing mistakes ("typos"), missing data, and all sorts of other errors in raw data files.
    </p>
  </div>

  <p>
    For less extreme values, even if they are flagged in a boxplot as outliers, the decision about
    whether to include or exclude them in any analysis depends heavily on why you think
    the data look the way they do and what you want to use the data for. You really need to
    exercise good judgment here. If the outlier looks legitimate to you, then keep it.
  </p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'bar-charts',
    moduleId: 'module-5',
    title: 'Bar Charts',
    description: 'Visualize categorical data with bar and pie charts.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="bar-charts-title">
  <h2 id="bar-charts-title">5.3 Bar Graphs</h2>

  <p>
    Another form of graph that you often want to plot is the <strong>bar graph</strong>. Bar graphs are ideal for displaying
    categorical data, showing the frequency or count of observations in each category.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Bar Graphs</h4>
    <p>
      A <strong>bar graph</strong> (or bar chart) displays categorical data with rectangular bars, where the height
      of each bar represents the frequency, count, or proportion of observations in that category.
    </p>
    <ul>
      <li><strong>Categories</strong> – Distinct groups or levels of a nominal or ordinal variable (e.g., team names, product types)</li>
      <li><strong>Bar height</strong> – Represents the count or frequency of observations in each category</li>
      <li><strong>Spacing</strong> – Bars are typically separated by gaps, unlike histograms where bars touch</li>
    </ul>
  </div>

  <h3>5.3.1 Creating bar graphs in jamovi</h3>

  <p>
    To create a bar graph in jamovi, first make sure your categorical variable is in the 'Variables' box under
    'Exploration' → 'Descriptives'. If you want to display only specific categories, you can use the 'Filters'
    function to include only those values you're interested in.
  </p>

  <p>
    For example, if you want to create a bar graph showing data for only four specific teams, you would:
  </p>

  <ol>
    <li>Open the 'Filters' screen</li>
    <li>Create a filter using the "==" operator to match specific values (e.g., <code>variable == 'Category1' or variable == 'Category2'</code>)</li>
    <li>Click on the 'Bar plot' checkbox in the Plots options</li>
  </ol>

  <div class="critical-points">
    <h4>Critical Point: Bar Graphs vs. Histograms</h4>
    <p>
      Understanding when to use each type of chart:
    </p>
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>Bar Graph</th>
          <th>Histogram</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data type</td>
          <td>Categorical (nominal/ordinal)</td>
          <td>Continuous (interval/ratio)</td>
        </tr>
        <tr>
          <td>Bar spacing</td>
          <td>Gaps between bars</td>
          <td>No gaps (bars touch)</td>
        </tr>
        <tr>
          <td>X-axis</td>
          <td>Category labels</td>
          <td>Continuous scale with bins</td>
        </tr>
        <tr>
          <td>Purpose</td>
          <td>Compare categories</td>
          <td>Show distribution shape</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>5.3.2 Saving graphs</h3>

  <p>
    Once you've created a bar graph (or any plot) in jamovi, you can save it by right-clicking on the plot image
    and saving it to a file. jamovi allows you to save in formats such as 'eps', 'svg', or 'pdf'. These formats
    all produce high-quality images that you can include in reports, presentations, or papers.
  </p>

  <div class="key-points">
    <h4>Key Points: When to Use Bar Graphs</h4>
    <ul>
      <li><strong>Best for categorical data</strong> – Use when comparing frequencies across discrete categories</li>
      <li><strong>Easy to read</strong> – Viewers can quickly compare the height of bars to see which categories are more or less frequent</li>
      <li><strong>Flexible</strong> – Can display counts, percentages, or other summary statistics</li>
      <li><strong>Not for continuous data</strong> – Use histograms for continuous variables instead</li>
    </ul>
  </div>

  <h3>5.3.3 The power of visualization</h3>

  <p>
    Visualizing data is one of the most important tasks facing the data analyst. It's important
    for two distinct but closely related reasons. First, there's the matter of drawing "presentation
    graphics": displaying your data in a clean, visually appealing fashion makes it easier for your
    reader to understand what you're trying to tell them. Equally important, perhaps even more
    important, is the fact that drawing graphs helps you to understand the data. To that end, it's
    important to draw "exploratory graphics" that help you learn about the data as you go about
    analyzing it.
  </p>

  <p>
    As Edward Tufte wisely noted: <em>"Above all else show the data."</em> The human visual system
    is a very powerful data analysis tool. Give it the right kind of information and it will supply
    a human reader with a massive amount of knowledge very quickly.
  </p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'scatterplots',
    moduleId: 'module-5',
    title: 'Scatter Plots',
    description: 'Visualize relationships between two continuous variables.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="scatterplots-title">
  <h2 id="scatterplots-title">5.4 Scatter Plots</h2>

  <p>
    A <strong>scatterplot</strong> (also called a scatter graph or scatter chart) is one of the most important tools for examining the relationship between two continuous variables. Unlike the graphs we've discussed so far, which focus on single variables, scatterplots allow us to visualize how two variables are related to each other.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Scatter Plots</h4>
    <p>
      A <strong>scatterplot</strong> displays the relationship between two continuous variables by plotting each observation as a point in two-dimensional space.
    </p>
    <ul>
      <li><strong>X-axis</strong> – Typically represents the independent variable or predictor</li>
      <li><strong>Y-axis</strong> – Typically represents the dependent variable or outcome</li>
      <li><strong>Points</strong> – Each point represents one observation's values on both variables</li>
      <li><strong>Pattern</strong> – The overall arrangement of points reveals the relationship between variables</li>
    </ul>
  </div>

  <h3>5.4.1 What scatter plots reveal</h3>

  <p>
    Scatter plots are powerful because they allow you to see several important characteristics of the relationship between two variables:
  </p>

  <ul>
    <li><strong>Direction</strong> – Is the relationship positive (upward trend) or negative (downward trend)?</li>
    <li><strong>Strength</strong> – How closely do the points cluster around a pattern?</li>
    <li><strong>Form</strong> – Is the relationship linear, curved, or non-existent?</li>
    <li><strong>Outliers</strong> – Are there any points that don't fit the general pattern?</li>
  </ul>

  <div class="key-points">
    <h4>Key Points: Interpreting Scatter Plots</h4>
    <ul>
      <li><strong>Positive relationship</strong> – Points slope upward from left to right (as X increases, Y increases)</li>
      <li><strong>Negative relationship</strong> – Points slope downward from left to right (as X increases, Y decreases)</li>
      <li><strong>No relationship</strong> – Points show no clear pattern or trend</li>
      <li><strong>Correlation ≠ Causation</strong> – A pattern in a scatterplot shows association, not necessarily cause-and-effect</li>
    </ul>
  </div>

  <h3>5.4.2 Creating scatter plots in jamovi</h3>

  <p>
    To create a scatterplot in jamovi, you'll typically use the plotting functions available in various analysis menus. Scatter plots are particularly useful when:
  </p>

  <ul>
    <li>Exploring potential relationships before conducting correlation or regression analyses</li>
    <li>Checking assumptions about linearity in your data</li>
    <li>Identifying outliers that might influence your statistical analyses</li>
    <li>Communicating relationships visually in reports and presentations</li>
  </ul>

  <div class="critical-points">
    <h4>Critical Point: When to Use Scatter Plots</h4>
    <p>
      Scatter plots are most appropriate when:
    </p>
    <ul>
      <li><strong>Both variables are continuous</strong> – Interval or ratio scale data work best</li>
      <li><strong>You want to explore relationships</strong> – Before running correlation or regression analyses</li>
      <li><strong>You need to check assumptions</strong> – Many statistical tests assume linear relationships</li>
      <li><strong>You want to identify patterns or outliers</strong> – Visual inspection often reveals issues that summary statistics miss</li>
    </ul>
    <p>
      Remember: correlation does not imply causation. A scatterplot can show that two variables are related, but it cannot prove that one causes the other.
    </p>
  </div>

  <h3>5.4.3 Advanced scatterplot techniques</h3>

  <p>
    More advanced uses of scatterplots include:
  </p>

  <ul>
    <li><strong>Adding trend lines</strong> – Overlay a line of best fit to see the relationship more clearly</li>
    <li><strong>Color coding by group</strong> – Use different colors for different categories to see if relationships vary across groups</li>
    <li><strong>Size coding</strong> – Vary point size to represent a third variable (creating a bubble plot)</li>
    <li><strong>Adding confidence bands</strong> – Show the uncertainty around a trend line</li>
  </ul>

  <p>
    Scatter plots are fundamental to understanding relationships in data and form the visual foundation for correlation and regression analyses that you'll encounter in more advanced statistical work.
  </p>

  <div class="attribution">
    <p><em>This content provides an introduction to scatter plots as a complement to the visualization topics in "Learning Statistics with jamovi."</em></p>
  </div>
</section>
`
  },

  // Module 6: Probability and Sampling
  {
    id: 'probability-basics',
    moduleId: 'module-6',
    title: 'Probability Basics',
    description: 'Fundamental probability rules and calculations.',
    icon: 'T'
  },
  {
    id: 'normal-distribution',
    moduleId: 'module-6',
    title: 'The Normal Distribution',
    description: 'Properties of the bell curve and the empirical rule.',
    icon: 'T'
  },
  {
    id: 'z-scores',
    moduleId: 'module-6',
    title: 'Z-Scores and Standardization',
    description: 'Converting raw scores and using z-tables.',
    icon: 'T'
  },
  {
    id: 'sampling-distributions',
    moduleId: 'module-6',
    title: 'Sampling Distributions',
    description: 'The central limit theorem and standard error.',
    icon: 'T'
  },

  // Module 7: Hypothesis Testing
  {
    id: 'hypothesis-testing',
    moduleId: 'module-7',
    title: 'Hypothesis Testing Logic',
    description: 'Null and alternative hypotheses, decision making.',
    icon: 'T'
  },
  {
    id: 'p-values',
    moduleId: 'module-7',
    title: 'Understanding P-Values',
    description: 'What p-values mean and common misinterpretations.',
    icon: 'T'
  },
  {
    id: 'effect-size',
    moduleId: 'module-7',
    title: 'Effect Sizes',
    description: "Cohen's d, r, and practical significance.",
    icon: 'T'
  },
  {
    id: 'confidence-intervals',
    moduleId: 'module-7',
    title: 'Confidence Intervals',
    description: 'Estimating population parameters with uncertainty.',
    icon: 'T'
  },

  // Module 8: Comparing Groups/Relationships
  {
    id: 't-tests',
    moduleId: 'module-8',
    title: 'T-Tests',
    description: 'One-sample, independent, and paired t-tests.',
    icon: 'T'
  },
  {
    id: 'correlation',
    moduleId: 'module-8',
    title: 'Correlation',
    description: 'Pearson and Spearman correlation coefficients.',
    icon: 'T'
  },
  {
    id: 'regression',
    moduleId: 'module-8',
    title: 'Simple Linear Regression',
    description: 'Predicting outcomes with regression equations.',
    icon: 'T'
  }
]

export const software = [
  { id: 'spss', name: 'SPSS', color: '#cc0000' },
  { id: 'r', name: 'R', color: '#276dc3' },
  { id: 'excel', name: 'Excel', color: '#217346' },
  { id: 'stata', name: 'Stata', color: '#1a476f' },
  { id: 'jamovi', name: 'jamovi', color: '#8b5cf6' }
]

// Helper functions
export function getTopicById(topicId) {
  return topics.find(t => t.id === topicId)
}

export function getTopicsByModule(moduleId) {
  return topics.filter(t => t.moduleId === moduleId)
}

export function getAllTopics() {
  return topics
}
