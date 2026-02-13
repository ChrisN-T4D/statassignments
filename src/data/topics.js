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

  // Screen Recording Tutorial (Module 3)
  {
    id: 'screen-recording-tutorial',
    moduleId: 'module-3',
    title: 'How to Record Your Screen',
    description: 'Learn how to capture your statistical analysis walkthrough for documentation and submissions.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="screen-recording-title">
  <h2 id="screen-recording-title">How to Record Your Screen</h2>

  <blockquote class="chapter-quote">
    <p>The best way to learn is to teach. The second best way is to watch yourself work.</p>
    <footer>– Unknown</footer>
  </blockquote>

  <h3>Why Screen Recording Matters</h3>

  <p>
    Recording your screen while conducting statistical analyses is a valuable skill that serves multiple purposes:
  </p>

  <ul>
    <li><strong>Document your process</strong> – Create a record of the exact steps you took in your analysis</li>
    <li><strong>Get help from instructors</strong> – Share your recording to show exactly where you're stuck</li>
    <li><strong>Build your portfolio</strong> – Demonstrate your statistical skills to future employers or graduate programs</li>
    <li><strong>Review your work</strong> – Watch yourself work to identify mistakes or areas for improvement</li>
    <li><strong>Complete assignments</strong> – Many courses require you to submit screen recordings of your analyses</li>
  </ul>

  <div class="concept-box">
    <h4>What You'll Learn</h4>
    <p>
      This tutorial will teach you how to use free, built-in screen recording tools on your computer.
      You don't need to install any special software – every modern operating system includes screen
      recording capabilities. By the end, you'll be able to record your statistical work with confidence.
    </p>
  </div>

  <h3>Built-in Screen Recording Tools</h3>

  <p>
    All modern operating systems include free screen recording tools. These are the easiest way to get started
    because they're already installed on your computer and require no setup.
  </p>

  <h4>Windows: Xbox Game Bar</h4>

  <p>
    Windows 10 and 11 include the Xbox Game Bar, which can record any application on your screen.
  </p>

  <div class="content-box">
    <h5>Quick Start (Windows)</h5>
    <ol>
      <li>Open the application you want to record (e.g., Jamovi, SPSS, R Studio)</li>
      <li>Press <code>Windows Key + G</code> to open Xbox Game Bar</li>
      <li>Click the <strong>Record</strong> button (⏺) or press <code>Windows Key + Alt + R</code></li>
      <li>A timer will appear showing you're recording</li>
      <li>Work through your analysis as normal</li>
      <li>Press <code>Windows Key + Alt + R</code> again to stop recording</li>
      <li>Your video is automatically saved to <code>C:\\Users\\[YourName]\\Videos\\Captures</code></li>
    </ol>
  </div>

  <div class="tip-box">
    <strong>💡 Tip:</strong> If you want to narrate your recording, make sure your microphone is enabled
    in the Xbox Game Bar settings (click the settings icon before recording).
  </div>

  <h4>Mac: Screenshot Toolbar</h4>

  <p>
    macOS includes a powerful screen recording tool built into the Screenshot toolbar.
  </p>

  <div class="content-box">
    <h5>Quick Start (Mac)</h5>
    <ol>
      <li>Press <code>Command + Shift + 5</code> to open the Screenshot toolbar</li>
      <li>Click <strong>Record Entire Screen</strong> or <strong>Record Selected Portion</strong></li>
      <li>If recording a portion, drag to select the area (e.g., just your Jamovi window)</li>
      <li>Click <strong>Options</strong> to:
        <ul>
          <li>Choose where to save the recording</li>
          <li>Enable microphone audio</li>
          <li>Show mouse clicks</li>
        </ul>
      </li>
      <li>Click <strong>Record</strong></li>
      <li>Click the <strong>Stop</strong> button in the menu bar when finished</li>
      <li>Your video appears as a thumbnail in the corner – click to open, edit, or share</li>
    </ol>
  </div>

  <div class="tip-box">
    <strong>💡 Tip:</strong> You can trim the beginning and end of your recording by clicking the thumbnail
    and using the trim tool before saving.
  </div>

  <h4>Chrome: Browser Extensions (Any OS)</h4>

  <p>
    If you're using web-based statistical software (like Jamovi in the browser), Chrome extensions
    can be very convenient.
  </p>

  <div class="content-box">
    <h5>Recommended Chrome Extensions</h5>
    <ul>
      <li><strong>Loom</strong> – Records your screen and webcam, free for up to 5-minute videos</li>
      <li><strong>Screencastify</strong> – Simple recorder with editing tools, free tier available</li>
      <li><strong>Nimbus Screenshot & Screen Video Recorder</strong> – Full-featured, completely free</li>
    </ul>
    <p>
      Install from the <a href="https://chrome.google.com/webstore/category/extensions" target="_blank" rel="noopener noreferrer">Chrome Web Store</a>.
      After installation, click the extension icon, choose your recording settings, and start recording.
    </p>
  </div>

  <h3>Professional Screen Recording Tools (Optional)</h3>

  <p>
    If you need more advanced features or plan to create many recordings, consider these free professional tools:
  </p>

  <h4>OBS Studio (Windows, Mac, Linux)</h4>

  <div class="content-box">
    <p>
      <strong>OBS Studio</strong> is a professional-grade screen recorder used by content creators worldwide.
      It's completely free and open-source.
    </p>
    <p><strong>Best for:</strong> High-quality recordings, multiple scenes, advanced audio mixing</p>
    <p><strong>Download:</strong> <a href="https://obsproject.com/" target="_blank" rel="noopener noreferrer">obsproject.com</a></p>

    <h5>Quick Setup</h5>
    <ol>
      <li>Download and install OBS Studio</li>
      <li>Run the Auto-Configuration Wizard (appears on first launch)</li>
      <li>Select "Optimize for recording"</li>
      <li>Click <strong>+</strong> under Sources → <strong>Window Capture</strong></li>
      <li>Select your statistical software window</li>
      <li>Click <strong>Start Recording</strong> in the bottom-right</li>
      <li>Click <strong>Stop Recording</strong> when finished</li>
      <li>Videos save to your Videos folder by default</li>
    </ol>
  </div>

  <h4>ShareX (Windows Only)</h4>

  <div class="content-box">
    <p>
      <strong>ShareX</strong> is a lightweight, powerful screen capture tool for Windows.
    </p>
    <p><strong>Best for:</strong> Quick recordings, automatic uploads, GIF creation</p>
    <p><strong>Download:</strong> <a href="https://getsharex.com/" target="_blank" rel="noopener noreferrer">getsharex.com</a></p>
  </div>

  <h4>Loom (Web-based)</h4>

  <div class="content-box">
    <p>
      <strong>Loom</strong> records your screen and webcam simultaneously, then instantly creates a shareable link.
    </p>
    <p><strong>Best for:</strong> Quick recordings to share with instructors, no file management needed</p>
    <p><strong>Free tier:</strong> Unlimited videos up to 5 minutes each</p>
    <p><strong>Website:</strong> <a href="https://www.loom.com/" target="_blank" rel="noopener noreferrer">loom.com</a></p>
  </div>

  <h3>Recording Best Practices</h3>

  <p>
    Follow these tips to create clear, professional screen recordings of your statistical analyses:
  </p>

  <h4>Before Recording</h4>

  <ul>
    <li><strong>Close unnecessary windows</strong> – Minimize distractions and protect your privacy</li>
    <li><strong>Maximize your statistical software</strong> – Make it easy to see what you're doing</li>
    <li><strong>Prepare your data</strong> – Load your dataset and know what analysis you'll run</li>
    <li><strong>Test your audio</strong> – If narrating, record a 10-second test to check microphone levels</li>
    <li><strong>Check the default save location</strong> – Know where your video will be saved</li>
  </ul>

  <h4>During Recording</h4>

  <ul>
    <li><strong>Move your mouse slowly</strong> – Rapid movements are hard to follow in playback</li>
    <li><strong>Speak clearly (if narrating)</strong> – Explain what you're doing and why</li>
    <li><strong>Pause before clicking</strong> – Let viewers see what you're about to select</li>
    <li><strong>Keep it focused</strong> – Aim for 3-5 minutes per recording; break long analyses into parts</li>
    <li><strong>Don't worry about mistakes</strong> – They show your problem-solving process</li>
  </ul>

  <h4>After Recording</h4>

  <ul>
    <li><strong>Review your recording</strong> – Watch the first minute to ensure quality</li>
    <li><strong>Check file size</strong> – Large files (>100MB) may be slow to upload</li>
    <li><strong>Name files clearly</strong> – Use descriptive names like "Correlation-Analysis-Week3.mp4"</li>
    <li><strong>Trim if needed</strong> – Cut out dead time at the beginning/end</li>
  </ul>

  <div class="critical-points">
    <h4>Privacy & Security Tips</h4>
    <ul>
      <li>Close email, social media, and messaging apps before recording</li>
      <li>Hide browser bookmarks that might contain personal information</li>
      <li>If using real data, ensure you have permission to share it</li>
      <li>Consider using example datasets for instructional recordings</li>
      <li>Never share passwords or sensitive information in recordings</li>
    </ul>
  </div>

  <h3>Troubleshooting Common Issues</h3>

  <div class="content-box">
    <h4>Problem: No audio in recording</h4>
    <p><strong>Solution:</strong> Check your recording software's audio settings. Make sure "System Audio" or
    "Microphone" is enabled. Some tools require you to select an audio source before recording.</p>
  </div>

  <div class="content-box">
    <h4>Problem: Video file is too large</h4>
    <p><strong>Solution:</strong> Record at 720p instead of 1080p, or use a lower frame rate (15-30 fps).
    You can also compress the video using free tools like HandBrake.</p>
  </div>

  <div class="content-box">
    <h4>Problem: Recording is choppy/laggy</h4>
    <p><strong>Solution:</strong> Close other applications to free up computer resources. Lower the recording
    quality settings. Ensure you're saving to your local hard drive, not a network drive.</p>
  </div>

  <div class="content-box">
    <h4>Problem: Can't find my recording</h4>
    <p><strong>Solution:</strong> Check the default save location in your recording software's settings.
    Common locations: Videos/Captures folder (Windows), Desktop (Mac), Downloads folder.</p>
  </div>

  <h3>Quick Reference Card</h3>

  <p>
    Print or bookmark this quick reference for easy access while recording:
  </p>

  <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
    <thead>
      <tr style="background: var(--bg-elevated); border-bottom: 2px solid var(--border);">
        <th style="padding: 0.75rem; text-align: left;">Operating System</th>
        <th style="padding: 0.75rem; text-align: left;">Keyboard Shortcut</th>
        <th style="padding: 0.75rem; text-align: left;">Tool</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid var(--border);">
        <td style="padding: 0.75rem;">Windows 10/11</td>
        <td style="padding: 0.75rem;"><code>Win + G</code> then click Record</td>
        <td style="padding: 0.75rem;">Xbox Game Bar</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border);">
        <td style="padding: 0.75rem;">Windows (Start/Stop)</td>
        <td style="padding: 0.75rem;"><code>Win + Alt + R</code></td>
        <td style="padding: 0.75rem;">Xbox Game Bar</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border);">
        <td style="padding: 0.75rem;">Mac</td>
        <td style="padding: 0.75rem;"><code>Cmd + Shift + 5</code></td>
        <td style="padding: 0.75rem;">Screenshot Toolbar</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;">Chrome (any OS)</td>
        <td style="padding: 0.75rem;">Click extension icon</td>
        <td style="padding: 0.75rem;">Loom / Screencastify</td>
      </tr>
    </tbody>
  </table>

  <h3>Practice Exercise</h3>

  <div class="example-box">
    <h4>Your First Screen Recording</h4>
    <p><strong>Task:</strong> Create a 1-2 minute recording showing yourself:</p>
    <ol>
      <li>Opening your statistical software (Jamovi, SPSS, R, etc.)</li>
      <li>Loading a sample dataset</li>
      <li>Running a simple descriptive statistics analysis (mean, standard deviation)</li>
      <li>Showing the results output</li>
    </ol>
    <p><strong>Optional:</strong> Narrate your recording, explaining each step as you go.</p>
    <p><strong>Goal:</strong> Become comfortable with the recording process before you need to use it for assignments.</p>
  </div>

  <div class="tip-box">
    <strong>💡 Assignment Integration:</strong> The ScreenRecorder tool built into this platform includes
    many of these features automatically. Use it for assignments, and use these standalone tools when working
    on your own computer outside of class.
  </div>

  <h3>Additional Resources</h3>

  <ul>
    <li><a href="https://support.microsoft.com/en-us/windows/record-a-game-clip-on-your-pc-with-xbox-game-bar-2f477001-54d4-1276-9144-b0416a307f3c" target="_blank" rel="noopener noreferrer">Microsoft: How to use Xbox Game Bar</a></li>
    <li><a href="https://support.apple.com/guide/mac-help/take-screenshots-or-screen-recordings-mh26782/mac" target="_blank" rel="noopener noreferrer">Apple: Take screenshots or screen recordings on Mac</a></li>
    <li><a href="https://obsproject.com/wiki/" target="_blank" rel="noopener noreferrer">OBS Studio Documentation</a></li>
    <li><a href="https://www.loom.com/education" target="_blank" rel="noopener noreferrer">Loom for Education</a></li>
  </ul>

  <hr>

  <div class="attribution">
    <p>
      Original content created for this statistics course. Free to use and adapt for educational purposes.
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

  // Module 5: Data Manipulation (Chapter 6 - Pragmatic Matters)
  {
    id: 'tabulating-data',
    moduleId: 'module-5',
    title: 'Tabulating and Cross-Tabulating Data',
    description: 'Create frequency tables and contingency tables to summarize categorical data.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="tabulating-data-title">
  <h2 id="tabulating-data-title">6.1 Tabulating and Cross-Tabulating Data</h2>

  <blockquote class="chapter-quote">
    <p>The garden of life never seems to confine itself to the plots philosophers have laid out for its convenience.</p>
    <footer>–Roger Zelazny</footer>
  </blockquote>

  <p>
    A very common task when analysing data is the construction of <strong>frequency tables</strong>, or cross-tabulation
    of one variable against another. These tasks can be achieved in jamovi and are essential for understanding
    categorical data.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Frequency Tables</h4>
    <ul>
      <li><strong>Frequency table</strong> – A table showing counts of how many times each category appears in the data</li>
      <li><strong>Contingency table</strong> – A cross-tabulation showing the relationship between two categorical variables</li>
      <li><strong>Row percentages</strong> – Percentages calculated within each row (show distribution across columns for each row)</li>
      <li><strong>Column percentages</strong> – Percentages calculated within each column (show distribution across rows for each column)</li>
    </ul>
  </div>

  <h3>6.1.1 Creating tables for single variables</h3>

  <p>
    To create a frequency table in jamovi:
  </p>

  <ol>
    <li>Navigate to <strong>Analyses → Exploration → Descriptives</strong></li>
    <li>Add your categorical variable to the Variables box</li>
    <li>Check the <strong>"Frequency tables"</strong> checkbox</li>
  </ol>

  <p>
    The output will show you:
  </p>

  <ul>
    <li><strong>Levels</strong> – All different categories in your variable</li>
    <li><strong>Counts</strong> – How many times each category appears</li>
    <li><strong>% of Total</strong> – The percentage each category represents</li>
    <li><strong>Cumulative %</strong> – Running total of percentages</li>
  </ul>

  <div class="key-points">
    <h4>Key Points: When to Use Frequency Tables</h4>
    <ul>
      <li><strong>Best for categorical data</strong> – Nominal or ordinal variables</li>
      <li><strong>Quick overview</strong> – See distribution of responses at a glance</li>
      <li><strong>Identify patterns</strong> – Find the most and least common categories</li>
      <li><strong>Check data quality</strong> – Spot unexpected categories or data entry errors</li>
    </ul>
  </div>

  <h3>6.1.2 Creating contingency tables</h3>

  <p>
    For a table combining two variables (a cross-tabulation), you need a contingency table:
  </p>

  <ol>
    <li>Navigate to <strong>Analyses → Frequencies → Contingency Tables → Independent Samples</strong></li>
    <li>Add one variable to <strong>Rows</strong></li>
    <li>Add another variable to <strong>Columns</strong></li>
  </ol>

  <p>
    The resulting table shows counts for each combination of categories from both variables.
  </p>

  <h3>6.1.3 Adding percentages to contingency tables</h3>

  <p>
    Raw frequencies are useful, but percentages often make interpretation easier. In the Contingency Tables options,
    under <strong>Cells</strong>, you can check:
  </p>

  <ul>
    <li><strong>Row percentages</strong> – Show what percentage of each row falls in each column</li>
    <li><strong>Column percentages</strong> – Show what percentage of each column falls in each row</li>
    <li><strong>Total percentages</strong> – Show what percentage of all observations fall in each cell</li>
  </ul>

  <div class="critical-points">
    <h4>Critical Point: Interpreting Row vs. Column Percentages</h4>
    <p>
      The choice between row and column percentages depends on your research question:
    </p>
    <ul>
      <li><strong>Row percentages</strong> – Use when you want to compare distribution of the column variable within each level of the row variable</li>
      <li><strong>Column percentages</strong> – Use when you want to compare distribution of the row variable within each level of the column variable</li>
    </ul>
    <p>
      Example: If rows are "Gender" and columns are "Product Preference", row percentages tell you what percentage
      of males/females prefer each product. Column percentages tell you what percentage of people preferring each
      product are male/female.
    </p>
  </div>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 6, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'logical-expressions',
    moduleId: 'module-5',
    title: 'Logical Expressions',
    description: 'Use logical operators to create conditional statements and filter data.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="logical-expressions-title">
  <h2 id="logical-expressions-title">6.2 Logical Expressions in jamovi</h2>

  <p>
    A key concept in data transformations is the idea of a <strong>logical value</strong>. A logical value is an
    assertion about whether something is true or false. In jamovi, there are two logical values: TRUE and FALSE.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Logical Operators</h4>
    <p>
      <strong>Logical operators</strong> allow you to make comparisons and combine conditions:
    </p>
    <table>
      <thead>
        <tr>
          <th>Operator</th>
          <th>Meaning</th>
          <th>Example</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>==</td>
          <td>Equal to</td>
          <td>2 + 2 == 4</td>
          <td>TRUE</td>
        </tr>
        <tr>
          <td>!=</td>
          <td>Not equal to</td>
          <td>2 + 2 != 5</td>
          <td>TRUE</td>
        </tr>
        <tr>
          <td>&lt;</td>
          <td>Less than</td>
          <td>2 &lt; 3</td>
          <td>TRUE</td>
        </tr>
        <tr>
          <td>&lt;=</td>
          <td>Less than or equal</td>
          <td>2 &lt;= 2</td>
          <td>TRUE</td>
        </tr>
        <tr>
          <td>&gt;</td>
          <td>Greater than</td>
          <td>3 &gt; 2</td>
          <td>TRUE</td>
        </tr>
        <tr>
          <td>&gt;=</td>
          <td>Greater than or equal</td>
          <td>3 &gt;= 3</td>
          <td>TRUE</td>
        </tr>
        <tr>
          <td>and</td>
          <td>Both conditions true</td>
          <td>(2==2) and (3==3)</td>
          <td>TRUE</td>
        </tr>
        <tr>
          <td>or</td>
          <td>At least one condition true</td>
          <td>(2==2) or (2==3)</td>
          <td>TRUE</td>
        </tr>
        <tr>
          <td>NOT()</td>
          <td>Negates the condition</td>
          <td>NOT(2==3)</td>
          <td>TRUE</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>6.2.1 Assessing mathematical truths</h3>

  <p>
    You can use the equality operator <strong>==</strong> to force jamovi to make a "true or false" judgment.
    For example, you can create a computed variable with the formula:
  </p>

  <pre><code>2 + 2 == 4</code></pre>

  <p>
    This will create a column of TRUE values because 2 + 2 does indeed equal 4. If you try:
  </p>

  <pre><code>2 + 2 == 5</code></pre>

  <p>
    You'll get a column of FALSE values because this statement is not true.
  </p>

  <div class="critical-points">
    <h4>Critical Point: = vs. ==</h4>
    <p>
      A common error when writing logical commands is confusing <strong>=</strong> with <strong>==</strong>:
    </p>
    <ul>
      <li><strong>=</strong> (single equals) – Assignment operator (not typically used in jamovi formulas)</li>
      <li><strong>==</strong> (double equals) – Equality test operator (checks if two things are equal)</li>
    </ul>
    <p>
      Always use <strong>==</strong> when you want to test if two values are equal!
    </p>
  </div>

  <h3>6.2.2 Combining logical operations</h3>

  <p>
    You can combine logical operators to create complex conditions:
  </p>

  <ul>
    <li><strong>and</strong> – Both conditions must be true</li>
    <li><strong>or</strong> – At least one condition must be true</li>
    <li><strong>NOT()</strong> – Reverses the truth value</li>
  </ul>

  <p>
    Examples:
  </p>

  <pre><code>(Age >= 18) and (Age <= 65)  # TRUE for adults 18-65
(Status == "Student") or (Status == "Faculty")  # TRUE for students or faculty
NOT(Score < 50)  # TRUE for scores 50 or above</code></pre>

  <h3>6.2.3 Applying logical operations to text</h3>

  <p>
    Logical operators work with text (strings) as well as numbers. However, jamovi is strict about exact matches:
  </p>

  <ul>
    <li><code>"cat" == "cat"</code> is TRUE</li>
    <li><code>"cat" == "CAT"</code> is FALSE (case-sensitive!)</li>
    <li><code>" cat" == "cat"</code> is FALSE (extra space matters!)</li>
  </ul>

  <div class="key-points">
    <h4>Key Points: Working with Text</h4>
    <ul>
      <li><strong>Case matters</strong> – "Cat", "cat", and "CAT" are all different</li>
      <li><strong>Spacing matters</strong> – Extra spaces make strings different</li>
      <li><strong>Alphabetical order</strong> – You can use &lt; and &gt; with text ("cat" &lt; "dog" is TRUE)</li>
      <li><strong>Uppercase before lowercase</strong> – All uppercase letters come before all lowercase in alphabetical ordering</li>
    </ul>
  </div>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 6, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'transforming-variables',
    moduleId: 'module-5',
    title: 'Transforming and Recoding Variables',
    description: 'Create new variables by transforming or recoding existing ones.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="transforming-variables-title">
  <h2 id="transforming-variables-title">6.3 Transforming and Recoding Variables</h2>

  <p>
    It's common in data analysis to find that one of your variables isn't quite in the format you need. You might
    want to convert a continuous variable into categories, or you might need to apply a mathematical transformation.
    This section covers how to handle these pragmatic data manipulation tasks.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Variable Transformation</h4>
    <ul>
      <li><strong>Transformation</strong> – Applying a mathematical function to create a new variable from an old one</li>
      <li><strong>Recoding</strong> – Changing the values of a variable according to specific rules</li>
      <li><strong>Centering</strong> – Subtracting a constant (usually the mean) to shift the scale</li>
      <li><strong>Collapsing</strong> – Combining multiple categories or ranges into fewer categories</li>
    </ul>
  </div>

  <h3>6.3.1 Creating a transformed variable</h3>

  <p>
    To create a computed variable in jamovi:
  </p>

  <ol>
    <li>Go to <strong>Data → Compute</strong></li>
    <li>Name your new variable</li>
    <li>Enter a formula in the formula box</li>
  </ol>

  <p>
    <strong>Example: Centering a Likert scale</strong><br>
    If you have a 1-7 Likert scale and want to center it so the midpoint is 0:
  </p>

  <pre><code>likert.raw - 4</code></pre>

  <p>
    This transforms the scale from 1-7 to -3 to +3, making the neutral point 0.
  </p>

  <h3>6.3.2 Using the ABS() function for opinion strength</h3>

  <p>
    Sometimes you want to separate the <em>strength</em> of an opinion from its <em>direction</em>.
    The <strong>ABS()</strong> function (absolute value) is perfect for this:
  </p>

  <pre><code>ABS(likert.centred)</code></pre>

  <p>
    This creates a variable showing how far from neutral each response is, regardless of positive or negative direction.
  </p>

  <h3>6.3.3 Using IF() statements for conditional transformations</h3>

  <p>
    The <strong>IF()</strong> function has three parts:
  </p>

  <pre><code>IF(condition, value_if_true, value_if_false)</code></pre>

  <p>
    <strong>Example: Creating a pass/fail variable</strong>
  </p>

  <pre><code>IF(Score >= 60, "Pass", "Fail")</code></pre>

  <div class="key-points">
    <h4>Key Points: Nested IF Statements</h4>
    <p>
      You can nest IF statements to create multiple categories:
    </p>
    <pre><code>IF(Age >= 0 and Age <= 20, "Young",
IF(Age >= 21 and Age <= 40, "Adult",
IF(Age >= 41 and Age <= 60, "Older")))</code></pre>
    <p>
      <strong>Important:</strong> Count your parentheses! Each IF needs to close with a matching ).
    </p>
  </div>

  <h3>6.3.4 Collapsing a variable into categories</h3>

  <p>
    Often you'll want to group continuous data into a smaller number of discrete categories. For example,
    collapsing age into young/adult/older categories can make analysis and interpretation easier.
  </p>

  <p>
    However, be cautious: collapsing continuous data into categories loses information. Only do this when
    the resulting categories are meaningful for your research question.
  </p>

  <div class="critical-points">
    <h4>Critical Point: When to Collapse Variables</h4>
    <p>
      Consider these factors before collapsing continuous variables:
    </p>
    <ul>
      <li><strong>Loss of information</strong> – Categorizing throws away detail and can reduce statistical power</li>
      <li><strong>Meaningful categories</strong> – Ensure your categories make theoretical sense, not just computational convenience</li>
      <li><strong>Alternative analyses</strong> – Often you can analyze continuous data directly (e.g., regression instead of ANOVA)</li>
      <li><strong>Assumption violations</strong> – Categorized data may violate assumptions (e.g., normality) that the original data satisfied</li>
    </ul>
  </div>

  <h3>6.3.5 Creating reusable transformations</h3>

  <p>
    When you need to apply the same transformation to multiple variables (e.g., multiple questionnaire items),
    use <strong>Data → Transform</strong>:
  </p>

  <ol>
    <li>Click the variable you want to transform</li>
    <li>Click <strong>Data → Transform</strong></li>
    <li>Name your new variable and transformation</li>
    <li>Use <strong>$source</strong> in your formula to refer to the original variable</li>
  </ol>

  <p>
    Example formula:
  </p>

  <pre><code>ABS($source - 4)</code></pre>

  <p>
    This transformation can then be applied to other variables by selecting them and choosing your saved transformation
    from the "using transform" dropdown.
  </p>

  <h3>6.3.6 Using Transform with conditional rules</h3>

  <p>
    The Transform interface also has an <strong>"Add condition" button (+)</strong> that lets you create multiple
    conditional rules visually:
  </p>

  <ol>
    <li>Click the <strong>+</strong> button next to the formula box</li>
    <li>Add conditions like: <code>if $source <= 20 use "young"</code></li>
    <li>Add another: <code>if $source <= 40 use "adult"</code></li>
    <li>In the "else" box: <code>use "older"</code></li>
  </ol>

  <p>
    This approach is often easier to read and maintain than nested IF statements.
  </p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 6, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'mathematical-functions',
    moduleId: 'module-5',
    title: 'Mathematical Functions',
    description: 'Use mathematical functions like logarithms, square roots, and exponentials.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="mathematical-functions-title">
  <h2 id="mathematical-functions-title">6.4 Mathematical Functions and Operations</h2>

  <p>
    jamovi has a range of mathematical functions built into it that are useful for data transformations.
    While most of the book focuses on functions strictly necessary for specific analyses, logarithms and
    exponentials deserve special attention because they appear everywhere in statistics.
  </p>

  <div class="terminology-box">
    <h4>Common Mathematical Functions</h4>
    <table>
      <thead>
        <tr>
          <th>Function</th>
          <th>jamovi Code</th>
          <th>Example</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Square root</td>
          <td>SQRT(x)</td>
          <td>SQRT(25)</td>
          <td>5</td>
        </tr>
        <tr>
          <td>Absolute value</td>
          <td>ABS(x)</td>
          <td>ABS(-23)</td>
          <td>23</td>
        </tr>
        <tr>
          <td>Logarithm (base 10)</td>
          <td>LOG10(x)</td>
          <td>LOG10(1000)</td>
          <td>3</td>
        </tr>
        <tr>
          <td>Natural logarithm (base e)</td>
          <td>LN(x)</td>
          <td>LN(1000)</td>
          <td>6.908</td>
        </tr>
        <tr>
          <td>Exponential (e^x)</td>
          <td>EXP(x)</td>
          <td>EXP(6.908)</td>
          <td>1000.245</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>6.4.1 Understanding logarithms</h3>

  <p>
    A <strong>logarithm</strong> is essentially the "opposite" of taking a power. If:
  </p>

  <p style="text-align: center; font-size: 1.1em;">
    10³ = 1000
  </p>

  <p>
    Then we can also say:
  </p>

  <p style="text-align: center; font-size: 1.1em;">
    log₁₀(1000) = 3
  </p>

  <p>
    In words: "10 to the power of 3 equals 1000" is equivalent to "the logarithm base 10 of 1000 equals 3."
  </p>

  <p>
    The <strong>LOG10()</strong> function in jamovi calculates logarithms in base 10.
  </p>

  <h3>6.4.2 Natural logarithms and Euler's number</h3>

  <p>
    While base 10 is convenient for humans (we use decimal numbers), mathematics has a special preference for
    base <em>e</em>, known as <strong>Euler's number</strong>:
  </p>

  <p style="text-align: center; font-size: 1.1em;">
    e ≈ 2.718282
  </p>

  <p>
    Logarithms in base <em>e</em> are called <strong>natural logarithms</strong> and are extremely common in statistics.
    In jamovi, use the <strong>LN()</strong> function for natural logarithms.
  </p>

  <h3>6.4.3 Exponentials</h3>

  <p>
    The <strong>exponential function</strong> raises <em>e</em> to a given power. It's written as e^x or exp(x).
    In jamovi, use <strong>EXP()</strong>:
  </p>

  <pre><code>EXP(2)  # Calculates e^2 ≈ 7.389</code></pre>

  <p>
    Because e appears so frequently in statistical formulas, the exponential function (and its inverse, the natural
    logarithm) are foundational to many statistical procedures.
  </p>

  <div class="key-points">
    <h4>Key Points: When to Use Log Transformations</h4>
    <ul>
      <li><strong>Skewed distributions</strong> – Log transforms can make right-skewed data more symmetric</li>
      <li><strong>Multiplicative relationships</strong> – Convert multiplicative patterns to additive ones</li>
      <li><strong>Variance stabilization</strong> – Reduce the relationship between mean and variance</li>
      <li><strong>Interpretation caution</strong> – Remember that results are on the log scale and may need back-transformation</li>
    </ul>
  </div>

  <div class="critical-points">
    <h4>Critical Point: Which Logarithm to Use?</h4>
    <p>
      Different bases serve different purposes:
    </p>
    <ul>
      <li><strong>LOG10()</strong> – Easy to interpret (each unit = 10-fold change), good for presentation</li>
      <li><strong>LN()</strong> – Natural logarithm, preferred in statistical theory and many formulas</li>
      <li><strong>Base 2</strong> – Common in computer science and genetics (doubling/halving)</li>
    </ul>
    <p>
      In practice, the choice often doesn't matter much for analysis, but <strong>LN()</strong> is most common in statistics.
    </p>
  </div>

  <h3>6.4.4 Other useful functions</h3>

  <p>
    <strong>SQRT()</strong> – Square root is useful for:
  </p>

  <ul>
    <li>Variance stabilization when variance increases with the mean</li>
    <li>Converting variance to standard deviation</li>
    <li>Distance calculations</li>
  </ul>

  <p>
    <strong>ABS()</strong> – Absolute value is useful for:
  </p>

  <ul>
    <li>Measuring magnitude regardless of direction</li>
    <li>Calculating distances or differences</li>
    <li>Strength of opinion (regardless of positive/negative)</li>
  </ul>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 6, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'filtering-data',
    moduleId: 'module-5',
    title: 'Extracting Subsets with Filters',
    description: 'Use filters to include only specific cases in your analysis.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="filtering-data-title">
  <h2 id="filtering-data-title">6.5 Extracting a Subset of the Data</h2>

  <p>
    One very important kind of data handling is being able to extract a particular subset of the data. For instance,
    you might be interested only in analysing data from one experimental condition, or you may want to look closely
    at data from people over 50 years in age. Filters allow you to focus on specific observations without permanently
    deleting or modifying your data.
  </p>

  <div class="terminology-box">
    <h4>Terminology: Filters</h4>
    <ul>
      <li><strong>Filter</strong> – A logical expression that determines which rows to include in analysis</li>
      <li><strong>Active filter</strong> – A filter that is currently applied (greyed-out rows are excluded)</li>
      <li><strong>Filter column</strong> – The column showing checkmarks (✓) for included rows and grey for excluded rows</li>
      <li><strong>Non-destructive</strong> – Filters hide rows temporarily; the original data remains intact</li>
    </ul>
  </div>

  <h3>6.5.1 Creating a simple filter</h3>

  <p>
    To create a filter in jamovi:
  </p>

  <ol>
    <li>Click on <strong>Filters</strong> in the Data toolbar</li>
    <li>In the Filter box, type a logical expression</li>
    <li>Rows that don't meet the condition will be greyed out</li>
  </ol>

  <p>
    <strong>Example: Filter for one category</strong>
  </p>

  <pre><code>speaker == 'makka-pakka'</code></pre>

  <p>
    This keeps only rows where the speaker variable equals "makka-pakka". All other rows are greyed out and
    excluded from analyses.
  </p>

  <h3>6.5.2 Using multiple conditions</h3>

  <p>
    You can build complex filters using logical operators:
  </p>

  <p>
    <strong>Example: Filter for multiple values (OR)</strong>
  </p>

  <pre><code>utterance == 'pip' or utterance == 'oo'</code></pre>

  <p>
    This keeps rows where utterance is either "pip" or "oo".
  </p>

  <p>
    <strong>Example: Filter for a range (AND)</strong>
  </p>

  <pre><code>Age >= 18 and Age <= 65</code></pre>

  <p>
    This keeps only rows for people aged 18 to 65.
  </p>

  <p>
    <strong>Example: Complex filter combining conditions</strong>
  </p>

  <pre><code>(Age >= 18 and Age <= 65) or Status == "Student"</code></pre>

  <p>
    This keeps adults aged 18-65 OR anyone with Status "Student" (regardless of age).
  </p>

  <div class="key-points">
    <h4>Key Points: Working with Filters</h4>
    <ul>
      <li><strong>Non-destructive</strong> – Original data is never deleted; toggle filters on/off</li>
      <li><strong>Visual feedback</strong> – Green checkmarks show included rows, grey shows excluded rows</li>
      <li><strong>Affects all analyses</strong> – When a filter is active, all statistical analyses use only the filtered data</li>
      <li><strong>Multiple filters</strong> – You can create multiple filters and activate/deactivate them as needed</li>
      <li><strong>Check before reporting</strong> – Always verify which filters are active before finalizing results</li>
    </ul>
  </div>

  <div class="critical-points">
    <h4>Critical Point: When to Use Filters</h4>
    <p>
      Filters are appropriate when:
    </p>
    <ul>
      <li><strong>Temporary exclusions</strong> – You want to quickly compare analyses with/without certain cases</li>
      <li><strong>Subgroup analyses</strong> – Analyzing specific groups one at a time</li>
      <li><strong>Sensitivity analyses</strong> – Testing whether results change when excluding outliers</li>
      <li><strong>Meeting assumptions</strong> – Excluding cases that violate assumptions (document your reasoning!)</li>
    </ul>
    <p>
      <strong>Important:</strong> Always document which filters were active when reporting results. Readers need to
      know exactly which data were included in each analysis.
    </p>
  </div>

  <h3>6.5.3 Filter management</h3>

  <p>
    Good practices for managing filters:
  </p>

  <ul>
    <li><strong>Name your filters</strong> – Use descriptive names like "Adults only" or "Exclude outliers"</li>
    <li><strong>Document the logic</strong> – Keep notes about why each filter was created</li>
    <li><strong>Deactivate when done</strong> – Turn off filters when you're finished with subgroup analyses</li>
    <li><strong>Check the N</strong> – Always note how many cases are included/excluded</li>
    <li><strong>Be transparent</strong> – Report all filtering decisions in your methods section</li>
  </ul>

  <h3>6.5.4 Common filtering tasks</h3>

  <p>
    <strong>Exclude missing data for specific variables:</strong>
  </p>

  <pre><code>NOT(ISNA(variable_name))</code></pre>

  <p>
    <strong>Keep only complete cases (no missing data on any variable):</strong>
  </p>

  <pre><code>NOT(ISNA(var1)) and NOT(ISNA(var2)) and NOT(ISNA(var3))</code></pre>

  <p>
    <strong>Exclude outliers based on z-scores:</strong>
  </p>

  <pre><code>ABS(Z(Score)) < 3</code></pre>

  <p>
    This keeps cases within 3 standard deviations of the mean.
  </p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 6, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },

  // Module 6: Probability and Sampling
  {
    id: 'probability-concepts',
    moduleId: 'module-6',
    title: 'Probability Concepts',
    description: 'Probability vs statistics, frequentist vs Bayesian interpretations.',
    icon: 'T',
    contentHtml: `
<section class="module-content">
  <h2>Introduction to Probability</h2>

  <h3>7.1 How are probability and statistics different?</h3>

  <p>
    One of the most important distinctions in quantitative research is between probability theory and statistical inference.
    These two fields are closely related but work in opposite directions.
  </p>

  <div class="terminology-box">
    <h4>Key Terminology</h4>
    <ul>
      <li><strong>Probability theory:</strong> Starting with known properties of a system, we make predictions about what
      kind of data we should expect to observe</li>
      <li><strong>Statistical inference:</strong> Starting with observed data, we try to infer what the underlying system
      properties might be</li>
    </ul>
  </div>

  <p>
    <strong>Probability:</strong> If I know that a coin is fair (50% heads, 50% tails), probability theory tells me
    that if I flip it 100 times, I should expect to see about 50 heads. Probability moves from the general to the specific—from
    what we know about the system to predictions about data.
  </p>

  <p>
    <strong>Statistics:</strong> If I flip a coin 100 times and observe 52 heads and 48 tails, statistical inference
    helps me work backward to determine if the coin is fair or biased. Statistics moves from the specific to the general—from
    observed data to conclusions about the system.
  </p>

  <div class="critical-box">
    <h4>Critical Point</h4>
    <p>
      Probability and statistics are mathematical inverses of each other. Probability takes known parameters and predicts
      data patterns. Statistics takes observed data patterns and estimates unknown parameters. Both are essential tools
      for scientific reasoning.
    </p>
  </div>

  <h3>7.2 What does probability mean?</h3>

  <p>
    The word "probability" can mean different things depending on your philosophical perspective. The two main interpretations
    have important implications for how we do statistics.
  </p>

  <h4>7.2.1 The frequentist view</h4>

  <p>
    The <strong>frequentist interpretation</strong> defines probability as the <strong>long-run relative frequency</strong>
    of an event. If I flip a fair coin over and over, the proportion of heads will approach 0.5 as the number of flips increases.
    This limiting proportion is the probability.
  </p>

  <div class="terminology-box">
    <h4>Frequentist Probability</h4>
    <p>
      The probability of an event is the proportion of times it occurs in an infinitely long sequence of independent repetitions.
    </p>
  </div>

  <p>
    <strong>Example:</strong> Consider a political poll predicting an election outcome. A frequentist might say: "If we could
    run this election over and over under identical conditions, the candidate would win 60% of the time, so the probability
    of winning is 0.6."
  </p>

  <p>
    <strong>Limitations of the frequentist view:</strong>
  </p>
  <ul>
    <li><strong>Requires repeatability:</strong> Events must be capable of being repeated many times under identical conditions</li>
    <li><strong>Cannot handle unique events:</strong> What is the probability it will rain tomorrow? Tomorrow only happens once—there's
    no infinite sequence of identical tomorrows to observe</li>
    <li><strong>Cannot assign probabilities to hypotheses:</strong> We cannot say "the probability that this scientific theory
    is true is 0.8" because the theory is either true or false—it doesn't have a long-run frequency</li>
  </ul>

  <h4>7.2.2 The Bayesian view</h4>

  <p>
    The <strong>Bayesian interpretation</strong> treats probability as a <strong>degree of belief</strong> or
    <strong>degree of confidence</strong>. Probability quantifies uncertainty about whether something is true,
    whether an event will occur, or what the value of a parameter might be.
  </p>

  <div class="terminology-box">
    <h4>Bayesian Probability</h4>
    <p>
      Probability measures the degree of belief or confidence we have that a statement is true, an event will occur,
      or a parameter has a certain value. These probabilities can be updated as new evidence becomes available.
    </p>
  </div>

  <p>
    <strong>Example:</strong> Returning to the election poll, a Bayesian might say: "Based on all the evidence I have—polls,
    historical data, current events—my degree of confidence that the candidate will win is 0.6, or 60%."
  </p>

  <p>
    <strong>Strengths of the Bayesian view:</strong>
  </p>
  <ul>
    <li><strong>Handles unique events:</strong> We can assign a probability to one-time events like "it will rain tomorrow"
    or "this theory is correct"</li>
    <li><strong>Incorporates prior knowledge:</strong> Bayesian methods explicitly combine prior beliefs with new data using
    Bayes' theorem</li>
    <li><strong>Philosophically intuitive:</strong> Matches how we naturally think about uncertainty in everyday life</li>
    <li><strong>Can quantify uncertainty about parameters:</strong> We can make probabilistic statements about population means,
    effect sizes, and other parameters</li>
  </ul>

  <h4>7.2.3 What's the difference? Does it matter?</h4>

  <p>
    The distinction between frequentist and Bayesian probability has real consequences for statistical practice:
  </p>

  <ul>
    <li><strong>Interpretation of results:</strong> Frequentist confidence intervals and p-values are defined in terms of
    repeated sampling, which can be counterintuitive. Bayesian credible intervals directly quantify uncertainty about parameters</li>
    <li><strong>Use of prior information:</strong> Bayesian methods explicitly incorporate prior knowledge, while frequentist
    methods typically do not</li>
    <li><strong>Computational complexity:</strong> Historically, Bayesian methods were computationally intensive, but modern
    computing has made them increasingly practical</li>
  </ul>

  <div class="critical-box">
    <h4>Critical Point</h4>
    <p>
      Most traditional statistical methods taught in introductory courses (t-tests, ANOVA, regression) are frequentist.
      However, Bayesian methods are becoming increasingly popular, especially in fields dealing with complex models and
      small sample sizes. Both approaches are valuable, and understanding the difference helps you interpret statistical
      results correctly.
    </p>
  </div>

  <p>
    <strong>Practical note:</strong> For most basic analyses with reasonable sample sizes, frequentist and Bayesian methods
    often yield similar numerical results. The main differences emerge in how we interpret those results and how we handle
    prior information and uncertainty.
  </p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 7, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'probability-rules',
    moduleId: 'module-6',
    title: 'Probability Rules',
    description: 'Addition and multiplication rules, independent and mutually exclusive events.',
    icon: 'T',
    contentHtml: `
<section class="module-content">
  <h2>7.3 Basic probability theory</h2>

  <p>
    To work with probability systematically, we need some fundamental concepts and rules. These form the foundation
    of all probability calculations, from simple coin flips to complex statistical models.
  </p>

  <h3>7.3.1 Elementary events and sample spaces</h3>

  <div class="terminology-box">
    <h4>Key Terminology</h4>
    <ul>
      <li><strong>Elementary event:</strong> A single possible outcome of a random process (e.g., "rolling a 4" on a die)</li>
      <li><strong>Sample space:</strong> The set of all possible elementary events (e.g., {1, 2, 3, 4, 5, 6} for a die roll)</li>
      <li><strong>Probability distribution:</strong> A specification of the probability of each elementary event in the sample space</li>
    </ul>
  </div>

  <p>
    <strong>Example: Rolling a die</strong><br>
    When you roll a standard six-sided die, the sample space is {1, 2, 3, 4, 5, 6}. Each elementary event
    (rolling a specific number) has probability 1/6 if the die is fair. This collection of probabilities—assigning
    1/6 to each outcome—is the probability distribution for a fair die.
  </p>

  <p>
    <strong>Example: Flipping a coin</strong><br>
    The sample space is {heads, tails}. For a fair coin, P(heads) = 0.5 and P(tails) = 0.5. These probabilities
    constitute the probability distribution.
  </p>

  <h3>7.3.2 The basic rules of probability</h3>

  <p>
    All probabilities must follow three fundamental rules:
  </p>

  <div class="critical-box">
    <h4>The Three Basic Rules</h4>
    <ol>
      <li><strong>Non-negativity:</strong> Probabilities cannot be negative. P(A) ≥ 0 for any event A</li>
      <li><strong>Normalization:</strong> The probabilities of all elementary events in the sample space must sum to 1.
      This reflects the certainty that <em>something</em> in the sample space will occur</li>
      <li><strong>Additivity:</strong> If two events A and B are <strong>mutually exclusive</strong> (cannot both occur),
      then P(A or B) = P(A) + P(B)</li>
    </ol>
  </div>

  <p>
    <strong>Example of additivity:</strong> The probability of rolling either a 2 or a 5 on a single die roll is:
  </p>
  <p style="margin-left: 20px;">
    P(2 or 5) = P(2) + P(5) = 1/6 + 1/6 = 2/6 = 1/3
  </p>
  <p>
    This works because rolling a 2 and rolling a 5 are mutually exclusive—you cannot roll both on one throw.
  </p>

  <h3>7.3.3 The complement rule</h3>

  <p>
    The <strong>complement</strong> of an event A, denoted as "not A," consists of all outcomes in the sample space that
    are not in A. Because A and "not A" together cover all possibilities and are mutually exclusive:
  </p>

  <div class="terminology-box">
    <h4>Complement Rule</h4>
    <p>
      P(not A) = 1 − P(A)
    </p>
    <p>
      Equivalently: P(A) + P(not A) = 1
    </p>
  </div>

  <p>
    <strong>Example:</strong> If the probability of rain tomorrow is 0.3, then the probability of no rain is 1 − 0.3 = 0.7.
  </p>

  <h3>7.3.4 The multiplication rule for independent events</h3>

  <p>
    Two events are <strong>independent</strong> if the occurrence of one does not affect the probability of the other.
    For example, flipping a coin twice: the result of the first flip doesn't influence the second flip.
  </p>

  <div class="terminology-box">
    <h4>Independence and Multiplication</h4>
    <p>
      If events A and B are independent:<br>
      <strong>P(A and B) = P(A) × P(B)</strong>
    </p>
  </div>

  <p>
    <strong>Example:</strong> What is the probability of flipping two heads in a row with a fair coin?
  </p>
  <p style="margin-left: 20px;">
    P(heads on flip 1 and heads on flip 2) = P(heads on flip 1) × P(heads on flip 2)<br>
    = 0.5 × 0.5 = 0.25
  </p>

  <p>
    <strong>Example:</strong> What is the probability of rolling two sixes in a row with a fair die?
  </p>
  <p style="margin-left: 20px;">
    P(six on roll 1 and six on roll 2) = 1/6 × 1/6 = 1/36 ≈ 0.028
  </p>

  <h3>7.3.5 The general addition rule</h3>

  <p>
    When events are <strong>not</strong> mutually exclusive—they can occur together—we need a more general rule:
  </p>

  <div class="critical-box">
    <h4>General Addition Rule</h4>
    <p>
      P(A or B) = P(A) + P(B) − P(A and B)
    </p>
    <p>
      We subtract P(A and B) to avoid counting the overlap twice.
    </p>
  </div>

  <p>
    <strong>Example:</strong> Imagine drawing a card from a standard 52-card deck. What is the probability of drawing
    a heart or a face card (Jack, Queen, King)?
  </p>
  <ul>
    <li>P(heart) = 13/52 = 1/4</li>
    <li>P(face card) = 12/52 = 3/13</li>
    <li>P(heart and face card) = 3/52 (the Jack, Queen, and King of hearts)</li>
  </ul>
  <p style="margin-left: 20px;">
    P(heart or face card) = 13/52 + 12/52 − 3/52 = 22/52 = 11/26 ≈ 0.423
  </p>

  <h3>7.3.6 Conditional probability</h3>

  <p>
    <strong>Conditional probability</strong> is the probability of event A occurring given that event B has already occurred.
    We write this as P(A|B), read as "the probability of A given B."
  </p>

  <div class="terminology-box">
    <h4>Conditional Probability Formula</h4>
    <p>
      P(A|B) = P(A and B) / P(B)
    </p>
    <p>
      (provided P(B) > 0)
    </p>
  </div>

  <p>
    <strong>Example:</strong> In a class of 30 students, 18 are female and 12 are male. Among the females, 10 have brown eyes.
    Among the males, 4 have brown eyes. If you randomly select a female student, what is the probability she has brown eyes?
  </p>
  <p style="margin-left: 20px;">
    P(brown eyes | female) = (number of brown-eyed females) / (number of females) = 10/18 ≈ 0.556
  </p>

  <p>
    <strong>Note on independence:</strong> If A and B are independent, then P(A|B) = P(A). That is, learning that B occurred
    doesn't change the probability of A. This is the defining feature of independence.
  </p>

  <div class="critical-box">
    <h4>Critical Point</h4>
    <p>
      These basic rules—complement, multiplication for independent events, addition, and conditional probability—form
      the foundation of all probability calculations. Mastering these rules allows you to solve complex probability
      problems by breaking them into simpler pieces.
    </p>
  </div>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 7, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'binomial-distribution',
    moduleId: 'module-6',
    title: 'Binomial Distribution',
    description: 'Modeling the number of successes in repeated trials.',
    icon: 'T',
    contentHtml: `
<section class="module-content">
  <h2>7.4 The binomial distribution</h2>

  <p>
    The <strong>binomial distribution</strong> is one of the most important and widely used probability distributions in
    statistics. It describes the number of successes in a fixed number of independent trials, where each trial has only
    two possible outcomes.
  </p>

  <h3>7.4.1 When to use the binomial distribution</h3>

  <p>
    The binomial distribution applies when your situation meets four specific conditions:
  </p>

  <div class="critical-box">
    <h4>Four Requirements for a Binomial Distribution</h4>
    <ol>
      <li><strong>Fixed number of trials (n):</strong> You must conduct exactly n trials or observations</li>
      <li><strong>Binary outcomes:</strong> Each trial has exactly two possible outcomes, conventionally called "success"
      and "failure"</li>
      <li><strong>Constant probability:</strong> The probability of success (p) is the same for every trial</li>
      <li><strong>Independent trials:</strong> The outcome of one trial does not affect the outcomes of other trials</li>
    </ol>
  </div>

  <p>
    <strong>Examples of binomial situations:</strong>
  </p>
  <ul>
    <li>Flipping a coin 20 times and counting heads (n = 20, p = 0.5 if fair)</li>
    <li>Testing 100 manufactured items and counting defects (n = 100, p = defect rate)</li>
    <li>Asking 50 randomly selected voters if they support a candidate (n = 50, p = population support rate)</li>
    <li>Rolling a die 30 times and counting how many times you roll a 6 (n = 30, p = 1/6)</li>
  </ul>

  <div class="terminology-box">
    <h4>Key Terminology</h4>
    <ul>
      <li><strong>n:</strong> The number of trials (a fixed integer)</li>
      <li><strong>p:</strong> The probability of success on each trial (a number between 0 and 1)</li>
      <li><strong>X:</strong> The random variable representing the total number of successes (can be 0, 1, 2, ..., n)</li>
      <li><strong>P(X = k):</strong> The probability of getting exactly k successes in n trials</li>
    </ul>
  </div>

  <h3>7.4.2 The binomial formula</h3>

  <p>
    The probability of getting exactly k successes in n trials is given by the binomial probability formula:
  </p>

  <div class="critical-box">
    <h4>Binomial Probability Formula</h4>
    <p>
      P(X = k) = C(n, k) × p^k × (1−p)^(n−k)
    </p>
    <p>
      where C(n, k) = n! / (k!(n−k)!) is the binomial coefficient, representing the number of ways to choose k successes
      from n trials.
    </p>
  </div>

  <p>
    <strong>What this formula means:</strong>
  </p>
  <ul>
    <li><strong>p^k:</strong> The probability that k specific trials are successes</li>
    <li><strong>(1−p)^(n−k):</strong> The probability that the remaining (n−k) trials are failures</li>
    <li><strong>C(n, k):</strong> The number of different ways to arrange k successes among n trials</li>
  </ul>

  <p>
    <strong>Example: Coin flipping</strong><br>
    Suppose you flip a fair coin 10 times. What is the probability of getting exactly 6 heads?
  </p>
  <ul style="margin-left: 20px;">
    <li>n = 10 (number of flips)</li>
    <li>k = 6 (desired number of heads)</li>
    <li>p = 0.5 (probability of heads on each flip)</li>
    <li>C(10, 6) = 10! / (6! × 4!) = 210</li>
  </ul>
  <p style="margin-left: 20px;">
    P(X = 6) = 210 × (0.5)^6 × (0.5)^4<br>
    = 210 × 0.015625 × 0.0625<br>
    = 210 × 0.0009765625<br>
    ≈ 0.205
  </p>
  <p>
    So there's about a 20.5% chance of getting exactly 6 heads in 10 flips.
  </p>

  <h3>7.4.3 Mean and variance of the binomial distribution</h3>

  <p>
    Instead of calculating individual probabilities, we often want to know the typical or expected number of successes.
    The binomial distribution has simple formulas for its mean and variance:
  </p>

  <div class="terminology-box">
    <h4>Binomial Mean and Standard Deviation</h4>
    <ul>
      <li><strong>Mean (expected value):</strong> μ = n × p</li>
      <li><strong>Variance:</strong> σ² = n × p × (1−p)</li>
      <li><strong>Standard deviation:</strong> σ = √(n × p × (1−p))</li>
    </ul>
  </div>

  <p>
    <strong>Example: Coin flipping</strong><br>
    If you flip a fair coin 100 times:
  </p>
  <ul style="margin-left: 20px;">
    <li>Expected number of heads: μ = 100 × 0.5 = 50</li>
    <li>Standard deviation: σ = √(100 × 0.5 × 0.5) = √25 = 5 heads</li>
  </ul>
  <p>
    This tells us that in 100 flips, we expect about 50 heads on average, with typical variation of about 5 heads in either
    direction.
  </p>

  <p>
    <strong>Example: Quality control</strong><br>
    A factory produces light bulbs with a 2% defect rate. If you randomly select 500 bulbs, how many defects do you expect?
  </p>
  <ul style="margin-left: 20px;">
    <li>n = 500, p = 0.02</li>
    <li>Expected defects: μ = 500 × 0.02 = 10 defects</li>
    <li>Standard deviation: σ = √(500 × 0.02 × 0.98) = √9.8 ≈ 3.13 defects</li>
  </ul>

  <h3>7.4.4 Using the binomial distribution in jamovi</h3>

  <p>
    While you can calculate binomial probabilities by hand using the formula, statistical software makes this much easier.
    In jamovi, you can:
  </p>
  <ul>
    <li>Calculate exact probabilities: P(X = k)</li>
    <li>Calculate cumulative probabilities: P(X ≤ k) or P(X ≥ k)</li>
    <li>Generate random samples from a binomial distribution</li>
    <li>Visualize the binomial distribution with different parameters</li>
  </ul>

  <div class="critical-box">
    <h4>Critical Point</h4>
    <p>
      The binomial distribution is the foundation for many statistical tests, including tests for proportions and
      categorical data analysis. Understanding when to apply it and how to interpret its parameters is essential for
      analyzing count data and yes/no outcomes.
    </p>
  </div>

  <p>
    <strong>Connection to normal distribution:</strong> When n is large and p is not too close to 0 or 1, the binomial
    distribution is approximately normal. This connection (via the Central Limit Theorem) is why the normal distribution
    appears so frequently in statistics.
  </p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 7, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'normal-distribution',
    moduleId: 'module-6',
    title: 'Normal Distribution',
    description: 'The bell curve and the empirical rule (68-95-99.7).',
    icon: 'T',
    contentHtml: `
<section class="module-content">
  <h2>7.5 The normal distribution</h2>

  <p>
    The <strong>normal distribution</strong> (also called the Gaussian distribution or bell curve) is arguably the most
    important probability distribution in statistics. It appears everywhere—from natural phenomena to statistical theory—and
    forms the basis for many statistical methods.
  </p>

  <h3>7.5.1 Probability density</h3>

  <p>
    Unlike the binomial distribution (which deals with discrete counts), the normal distribution is <strong>continuous</strong>—it
    can take any real number value. For continuous distributions, we cannot meaningfully ask "what is the probability of
    exactly X = 100.0000...?" because there are infinitely many possible values.
  </p>

  <div class="terminology-box">
    <h4>Probability Density</h4>
    <p>
      For continuous distributions, we work with <strong>probability density</strong> rather than probability. The area
      under the curve between two points gives the probability that the variable falls in that range.
    </p>
    <p>
      For example, P(98 ≤ X ≤ 102) is the area under the normal curve between 98 and 102.
    </p>
  </div>

  <p>
    The normal distribution has a characteristic bell shape: it's symmetric, with most values clustering around the center
    and fewer values in the tails. The curve never actually touches zero—it extends infinitely in both directions—but
    the probability becomes vanishingly small in the extreme tails.
  </p>

  <h3>7.5.2 Properties of the normal distribution</h3>

  <p>
    The normal distribution is completely specified by two parameters:
  </p>

  <div class="terminology-box">
    <h4>Normal Distribution Parameters</h4>
    <ul>
      <li><strong>Mean (μ):</strong> The center of the distribution—the peak of the bell curve</li>
      <li><strong>Standard deviation (σ):</strong> The spread or width of the distribution</li>
    </ul>
    <p>
      We write: X ~ N(μ, σ²), which reads "X is normally distributed with mean μ and variance σ²"
    </p>
  </div>

  <p>
    <strong>Key properties:</strong>
  </p>
  <ul>
    <li><strong>Symmetric:</strong> The left and right sides of the distribution are mirror images</li>
    <li><strong>Unimodal:</strong> Has a single peak at the mean</li>
    <li><strong>Mean = median = mode:</strong> All three measures of central tendency are equal</li>
    <li><strong>Asymptotic:</strong> The tails approach but never reach zero</li>
  </ul>

  <h3>7.5.3 The empirical rule (68-95-99.7 rule)</h3>

  <p>
    One of the most useful features of the normal distribution is that a fixed percentage of values always falls within
    a certain number of standard deviations from the mean:
  </p>

  <div class="critical-box">
    <h4>The Empirical Rule</h4>
    <ul>
      <li>Approximately <strong>68%</strong> of values fall within <strong>μ ± 1σ</strong> (within 1 SD of the mean)</li>
      <li>Approximately <strong>95%</strong> of values fall within <strong>μ ± 2σ</strong> (within 2 SD of the mean)</li>
      <li>Approximately <strong>99.7%</strong> of values fall within <strong>μ ± 3σ</strong> (within 3 SD of the mean)</li>
    </ul>
  </div>

  <p>
    <strong>Example: IQ scores</strong><br>
    IQ scores are designed to be normally distributed with μ = 100 and σ = 15. Using the empirical rule:
  </p>
  <ul style="margin-left: 20px;">
    <li>68% of people have IQs between 85 and 115 (100 ± 15)</li>
    <li>95% of people have IQs between 70 and 130 (100 ± 30)</li>
    <li>99.7% of people have IQs between 55 and 145 (100 ± 45)</li>
  </ul>
  <p>
    This means that an IQ above 130 (2 standard deviations above the mean) is quite rare, occurring in only about 2.5% of
    the population.
  </p>

  <h3>7.5.4 Standard scores (z-scores)</h3>

  <p>
    Often we want to know how unusual or extreme a particular value is. <strong>Z-scores</strong> (also called standard scores)
    express values in units of standard deviations from the mean.
  </p>

  <div class="terminology-box">
    <h4>Z-Score Formula</h4>
    <p>
      z = (X − μ) / σ
    </p>
    <p>
      where X is the observed value, μ is the mean, and σ is the standard deviation.
    </p>
  </div>

  <p>
    <strong>Interpreting z-scores:</strong>
  </p>
  <ul>
    <li>z = 0 means the value equals the mean</li>
    <li>z = 1 means the value is 1 standard deviation above the mean</li>
    <li>z = −2 means the value is 2 standard deviations below the mean</li>
    <li>Values with |z| > 3 are extremely rare (less than 0.3% of cases)</li>
  </ul>

  <p>
    <strong>Example: IQ scores</strong><br>
    Suppose someone has an IQ of 125. How unusual is this?
  </p>
  <p style="margin-left: 20px;">
    z = (125 − 100) / 15 = 25 / 15 = 1.67
  </p>
  <p>
    A z-score of 1.67 means this IQ is 1.67 standard deviations above average—higher than about 95% of the population.
  </p>

  <h3>7.5.5 The standard normal distribution</h3>

  <p>
    The <strong>standard normal distribution</strong> is a special case with μ = 0 and σ = 1. It's denoted as Z ~ N(0, 1).
    Any normal distribution can be converted to the standard normal by calculating z-scores.
  </p>

  <p>
    <strong>Why is this useful?</strong>
  </p>
  <ul>
    <li>Tables and calculators for the standard normal distribution can be used for any normal distribution via z-scores</li>
    <li>Z-scores allow comparison across different scales (e.g., comparing SAT scores to IQ scores)</li>
    <li>Many statistical tests use the standard normal distribution as a reference</li>
  </ul>

  <h3>7.5.6 Why the normal distribution is important</h3>

  <p>
    The normal distribution is central to statistics for several reasons:
  </p>

  <div class="critical-box">
    <h4>Importance of the Normal Distribution</h4>
    <ol>
      <li><strong>Natural phenomena:</strong> Many variables in nature are approximately normal—heights, weights, measurement
      errors, blood pressure, test scores</li>
      <li><strong>Central Limit Theorem:</strong> Even if a population is not normal, the distribution of sample means
      becomes approximately normal for large samples (discussed in Chapter 8)</li>
      <li><strong>Statistical methods:</strong> Many classical statistical tests (t-tests, ANOVA, regression) assume or
      rely on normality</li>
      <li><strong>Mathematical tractability:</strong> The normal distribution has convenient mathematical properties that
      make calculations easier</li>
    </ol>
  </div>

  <p>
    <strong>Example: Heights</strong><br>
    Adult male heights in many populations follow an approximately normal distribution with μ ≈ 175 cm and σ ≈ 7 cm.
    This means:
  </p>
  <ul style="margin-left: 20px;">
    <li>68% of men are between 168 and 182 cm tall</li>
    <li>95% of men are between 161 and 189 cm tall</li>
    <li>A man who is 190 cm (about 6'3") is unusually tall—taller than about 98% of men</li>
  </ul>

  <h3>7.5.7 Working with the normal distribution in jamovi</h3>

  <p>
    Statistical software like jamovi can:
  </p>
  <ul>
    <li>Calculate probabilities for any normal distribution (e.g., P(X < 110) when X ~ N(100, 15))</li>
    <li>Find z-scores and percentiles</li>
    <li>Test whether sample data appears to come from a normal distribution</li>
    <li>Create visual plots of normal distributions with different parameters</li>
  </ul>

  <p>
    Rather than memorizing normal distribution tables, modern practice relies on software to compute exact probabilities
    and critical values.
  </p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 7, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'other-distributions',
    moduleId: 'module-6',
    title: 'Other Distributions',
    description: 'The t, chi-square (χ²), and F distributions.',
    icon: 'T',
    contentHtml: `
<section class="module-content">
  <h2>7.6 Other useful distributions</h2>

  <p>
    While the normal distribution is fundamental, many statistical situations call for other distributions. Three
    particularly important ones are the t-distribution, the chi-square (χ²) distribution, and the F-distribution.
    Each serves specific purposes in statistical inference.
  </p>

  <h3>7.6.1 The t-distribution</h3>

  <p>
    The <strong>t-distribution</strong> (also called Student's t-distribution) looks similar to the normal distribution—it's
    symmetric and bell-shaped—but has heavier tails. This means it assigns more probability to extreme values.
  </p>

  <div class="terminology-box">
    <h4>Student's t-Distribution</h4>
    <p>
      A continuous probability distribution that is symmetric and bell-shaped like the normal distribution, but with
      heavier tails. The exact shape depends on the <strong>degrees of freedom (df)</strong>.
    </p>
    <p>
      As df increases, the t-distribution approaches the normal distribution. For df > 30, they are nearly identical.
    </p>
  </div>

  <p>
    <strong>When to use the t-distribution:</strong>
  </p>
  <ul>
    <li><strong>Small sample sizes:</strong> Typically when n &lt; 30</li>
    <li><strong>Unknown population standard deviation:</strong> When we must estimate σ from the sample</li>
    <li><strong>Inference about means:</strong> Constructing confidence intervals or conducting hypothesis tests about means</li>
  </ul>

  <p>
    <strong>Why use t instead of normal?</strong><br>
    When we estimate the population standard deviation from a sample, we introduce additional uncertainty. The t-distribution
    accounts for this extra uncertainty with its heavier tails, making our inferences more conservative (wider confidence
    intervals, harder to reject null hypotheses) when sample sizes are small.
  </p>

  <p>
    <strong>Degrees of freedom:</strong><br>
    For a single sample, df = n − 1. The degrees of freedom represent the amount of independent information available
    to estimate variability. With only 5 observations, df = 4, and the t-distribution has very heavy tails. With 100
    observations, df = 99, and t is nearly identical to the normal distribution.
  </p>

  <div class="critical-box">
    <h4>Critical Point</h4>
    <p>
      In practice, when testing means with real data, you almost always use the t-distribution rather than the normal
      distribution, because you rarely know the true population standard deviation. Software like jamovi automatically
      uses t-tests for comparing means.
    </p>
  </div>

  <h3>7.6.2 The chi-square (χ²) distribution</h3>

  <p>
    The <strong>chi-square distribution</strong> (pronounced "kai-square") is quite different from the normal and t
    distributions. It is right-skewed and only takes positive values.
  </p>

  <div class="terminology-box">
    <h4>Chi-Square Distribution</h4>
    <p>
      A continuous probability distribution that is right-skewed and ranges from 0 to infinity. It has one parameter:
      <strong>degrees of freedom (df)</strong>.
    </p>
    <p>
      As df increases, the distribution becomes less skewed and more symmetric.
    </p>
  </div>

  <p>
    <strong>When to use the chi-square distribution:</strong>
  </p>
  <ul>
    <li><strong>Tests of independence:</strong> Testing whether two categorical variables are related (e.g., is gender
    associated with voting preference?)</li>
    <li><strong>Goodness-of-fit tests:</strong> Testing whether observed frequencies match expected frequencies
    (e.g., does this die produce all six numbers equally often?)</li>
    <li><strong>Variance tests:</strong> Testing hypotheses about population variance (e.g., is the variability in
    this process greater than a target value?)</li>
  </ul>

  <p>
    <strong>Example: Testing independence</strong><br>
    Suppose you survey 200 people, recording both their gender (male/female) and whether they support a policy (yes/no).
    A chi-square test of independence can determine whether support rates differ significantly between genders. The test
    compares observed frequencies in each category combination to the frequencies you'd expect if gender and support were
    unrelated.
  </p>

  <p>
    <strong>Shape and properties:</strong><br>
    With df = 1 or 2, the chi-square distribution is highly right-skewed. As df increases, it becomes more symmetric and
    approaches a normal distribution. For large df, you can approximate chi-square probabilities using a normal distribution.
  </p>

  <h3>7.6.3 The F-distribution</h3>

  <p>
    The <strong>F-distribution</strong> is also right-skewed and positive-valued. It is used primarily for comparing
    variances and for analysis of variance (ANOVA).
  </p>

  <div class="terminology-box">
    <h4>F-Distribution</h4>
    <p>
      A continuous probability distribution that is right-skewed and ranges from 0 to infinity. It has two parameters:
      <strong>numerator degrees of freedom (df₁)</strong> and <strong>denominator degrees of freedom (df₂)</strong>.
    </p>
    <p>
      The shape depends on both df₁ and df₂.
    </p>
  </div>

  <p>
    <strong>When to use the F-distribution:</strong>
  </p>
  <ul>
    <li><strong>Comparing two variances:</strong> Testing whether two populations have equal variance (e.g., do males
    and females have the same variability in test scores?)</li>
    <li><strong>ANOVA (Analysis of Variance):</strong> Testing whether three or more groups have different means
    (e.g., do four teaching methods produce different average test scores?)</li>
    <li><strong>Regression analysis:</strong> Testing the overall significance of a regression model</li>
  </ul>

  <p>
    <strong>Example: ANOVA</strong><br>
    Suppose you want to compare average exam scores across four different teaching methods. An ANOVA uses the F-distribution
    to test whether at least one method produces a different mean score than the others. The F-statistic is the ratio of
    between-group variability to within-group variability.
  </p>

  <p>
    <strong>Why two degrees of freedom?</strong><br>
    The F-distribution arises from the ratio of two chi-square distributions, each divided by its degrees of freedom.
    In ANOVA, df₁ relates to the number of groups being compared, and df₂ relates to the total sample size and number of groups.
  </p>

  <h3>7.6.4 Choosing the right distribution</h3>

  <p>
    Understanding which distribution to use depends on your research question and data type:
  </p>

  <div class="critical-box">
    <h4>Distribution Decision Guide</h4>
    <ul>
      <li><strong>Normal (z-distribution):</strong> Use when the population standard deviation is known and sample size
      is large, or when working with z-scores</li>
      <li><strong>t-distribution:</strong> Use for inference about means when the population standard deviation is
      unknown (most common situation in practice)</li>
      <li><strong>χ² distribution:</strong> Use for categorical data analysis (tests of independence, goodness-of-fit)
      or for testing hypotheses about variance</li>
      <li><strong>F-distribution:</strong> Use for comparing variances between two groups or for comparing means across
      three or more groups (ANOVA)</li>
    </ul>
  </div>

  <p>
    <strong>Practical note:</strong> Statistical software handles the details of these distributions automatically. When
    you run a t-test in jamovi, it uses the t-distribution with the appropriate degrees of freedom. When you run a chi-square
    test of independence, it uses the χ² distribution. Understanding what these distributions represent helps you interpret
    the output correctly, even if you don't calculate probabilities by hand.
  </p>

  <h3>7.6.5 Relationships among distributions</h3>

  <p>
    These distributions are mathematically related:
  </p>
  <ul>
    <li>The <strong>t-distribution with infinite df</strong> is identical to the normal distribution</li>
    <li>The <strong>chi-square distribution</strong> is the distribution of squared standard normal variables</li>
    <li>The <strong>F-distribution</strong> is the ratio of two chi-square distributions (each divided by its df)</li>
    <li>A <strong>t-statistic squared</strong> follows an F-distribution with df₁ = 1</li>
  </ul>

  <p>
    These connections reveal the elegant mathematical structure underlying statistical inference, though you don't need
    to memorize these relationships to use the distributions effectively.
  </p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 7, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'sampling-theory',
    moduleId: 'module-6',
    title: 'Sampling Theory',
    description: 'Sampling methods, sampling error, and representativeness.',
    icon: 'T',
    contentHtml: `
<section class="module-content">
  <h2>8.1 Samples, populations and sampling</h2>

  <p>
    Statistical inference is fundamentally about learning something about a large group (the population) by studying
    a smaller group (a sample). Understanding the relationship between samples and populations is the foundation of
    inferential statistics.
  </p>

  <h3>8.1.1 Defining a population</h3>

  <div class="terminology-box">
    <h4>Key Terminology</h4>
    <ul>
      <li><strong>Population:</strong> The complete set of individuals, objects, or measurements that we're interested
      in studying</li>
      <li><strong>Sample:</strong> A subset of the population that we actually observe and measure</li>
      <li><strong>Parameter:</strong> A numerical characteristic of a population (e.g., population mean μ, population
      standard deviation σ)</li>
      <li><strong>Statistic:</strong> A numerical characteristic calculated from a sample (e.g., sample mean M or X̄,
      sample standard deviation s)</li>
    </ul>
  </div>

  <p>
    <strong>Example:</strong> If you want to know the average height of all adults in the UK (population), you cannot
    realistically measure all 50+ million people. Instead, you measure the heights of, say, 1,000 randomly selected
    adults (sample) and use the sample mean (statistic) to estimate the population mean (parameter).
  </p>

  <p>
    The population is defined by your research question. If you're studying "anxiety levels in university students,"
    the population might be all university students worldwide, all university students in your country, or all students
    at your university—it depends on what you want to generalize to.
  </p>

  <div class="critical-box">
    <h4>Critical Point</h4>
    <p>
      We almost never know the true values of population parameters. The entire purpose of inferential statistics is to
      use sample statistics to make educated guesses about unknown population parameters.
    </p>
  </div>

  <h3>8.1.2 Simple random samples</h3>

  <p>
    The <strong>simple random sample</strong> is the foundational sampling method in statistics. In a simple random sample,
    every member of the population has an equal probability of being selected, and all selections are independent.
  </p>

  <div class="terminology-box">
    <h4>Simple Random Sampling</h4>
    <p>
      A sampling method where:
    </p>
    <ul>
      <li>Every member of the population has an equal chance of being selected</li>
      <li>Each selection is independent of all others</li>
      <li>The probability of any particular sample of size n is the same as for any other sample of size n</li>
    </ul>
  </div>

  <p>
    <strong>Example:</strong> To select a simple random sample of 100 students from a university with 10,000 students,
    you could:
  </p>
  <ol>
    <li>Obtain a complete list of all 10,000 student ID numbers</li>
    <li>Use a random number generator to select 100 ID numbers</li>
    <li>Contact and measure those 100 students</li>
  </ol>

  <p>
    <strong>Why simple random samples matter:</strong> Most statistical theory assumes simple random sampling. When we
    calculate confidence intervals or conduct hypothesis tests, the formulas and p-values are valid only if the sample
    is (approximately) a simple random sample from the population.
  </p>

  <h3>8.1.3 Sampling with and without replacement</h3>

  <p>
    When selecting a sample, there are two approaches:
  </p>

  <div class="terminology-box">
    <h4>Sampling Methods</h4>
    <ul>
      <li><strong>Sampling with replacement:</strong> After selecting an individual, you "put them back" into the
      population, so they could potentially be selected again. Each draw is independent, with identical probabilities</li>
      <li><strong>Sampling without replacement:</strong> Once an individual is selected, they cannot be selected again.
      This is the more common approach in practice</li>
    </ul>
  </div>

  <p>
    <strong>Example:</strong> Drawing cards from a deck—with replacement means you shuffle the card back into the deck
    after each draw. Without replacement means you set the card aside and don't return it.
  </p>

  <p>
    <strong>Practical note:</strong> For large populations, the distinction barely matters. If you're sampling 100 people
    from a population of 10,000, whether you sample with or without replacement makes negligible difference to the
    probabilities. However, for small populations, sampling without replacement affects the calculations.
  </p>

  <h3>8.1.4 Most samples are not simple random samples</h3>

  <p>
    While simple random sampling is the theoretical ideal, real research rarely achieves it. Most studies use
    <strong>convenience samples</strong>—participants who are easily accessible—rather than true random samples.
  </p>

  <p>
    <strong>Example:</strong> A psychology study recruiting undergraduate students from an introductory psychology course
    is not a simple random sample of all humans, or even all adults, or even all university students. It's a convenience
    sample of students who happened to be available and willing to participate.
  </p>

  <p>
    <strong>Why does this matter?</strong>
  </p>
  <ul>
    <li><strong>Generalizability:</strong> Convenience samples may not represent the broader population. Results from
    university students may not apply to working adults or older populations</li>
    <li><strong>Bias:</strong> Systematic differences between the sample and population can lead to incorrect conclusions</li>
    <li><strong>Technical assumptions:</strong> Statistical tests assume random sampling, so violations can affect the
    validity of p-values and confidence intervals (though often the effects are small)</li>
  </ul>

  <div class="critical-box">
    <h4>Critical Point</h4>
    <p>
      The gap between theoretical simple random samples and actual convenience samples is one of the major limitations
      of statistical inference. Always ask: "To what population can I realistically generalize these results?" The answer
      depends on how representative your sample is, not on p-values or statistical significance.
    </p>
  </div>

  <h3>8.1.5 Parameters and statistics</h3>

  <p>
    Understanding the notation helps clarify the distinction between what we know (sample statistics) and what we're trying
    to learn (population parameters):
  </p>

  <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
    <tr style="background-color: #f0f0f0;">
      <th style="border: 1px solid #ddd; padding: 8px;">Measure</th>
      <th style="border: 1px solid #ddd; padding: 8px;">Population Parameter</th>
      <th style="border: 1px solid #ddd; padding: 8px;">Sample Statistic</th>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Mean</td>
      <td style="border: 1px solid #ddd; padding: 8px;">μ (mu)</td>
      <td style="border: 1px solid #ddd; padding: 8px;">M or X̄ (x-bar)</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Standard deviation</td>
      <td style="border: 1px solid #ddd; padding: 8px;">σ (sigma)</td>
      <td style="border: 1px solid #ddd; padding: 8px;">s or SD</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Variance</td>
      <td style="border: 1px solid #ddd; padding: 8px;">σ²</td>
      <td style="border: 1px solid #ddd; padding: 8px;">s²</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Proportion</td>
      <td style="border: 1px solid #ddd; padding: 8px;">p</td>
      <td style="border: 1px solid #ddd; padding: 8px;">p̂ (p-hat)</td>
    </tr>
  </table>

  <p>
    <strong>Remember:</strong> Greek letters (μ, σ) typically denote population parameters—values we don't know and want
    to estimate. Roman letters (M, s, p̂) denote sample statistics—values we calculate from our data and use as estimates.
  </p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 8, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'law-of-large-numbers',
    moduleId: 'module-6',
    title: 'Law of Large Numbers',
    description: 'Why larger samples produce more accurate estimates.',
    icon: 'T',
    contentHtml: `
<section class="module-content">
  <h2>8.2 The law of large numbers</h2>

  <p>
    One of the most fundamental principles in statistics is the <strong>law of large numbers</strong>. It provides
    the mathematical justification for why larger samples give us more accurate estimates of population parameters.
  </p>

  <h3>8.2.1 What the law of large numbers says</h3>

  <div class="terminology-box">
    <h4>Law of Large Numbers (LLN)</h4>
    <p>
      As the sample size (n) increases, the sample mean (M or X̄) converges to the population mean (μ). More formally,
      the probability that the sample mean differs from the population mean by more than any specified amount approaches
      zero as n approaches infinity.
    </p>
    <p>
      In simple terms: <strong>Bigger samples give more accurate estimates.</strong>
    </p>
  </div>

  <p>
    The law of large numbers applies to any statistic—means, proportions, standard deviations—but it's most commonly
    discussed in terms of the sample mean.
  </p>

  <h3>8.2.2 An intuitive example: coin flipping</h3>

  <p>
    Suppose you flip a fair coin. The true probability of heads is p = 0.5 (the population parameter). Now consider
    what happens when you flip the coin different numbers of times and calculate the proportion of heads:
  </p>

  <ul>
    <li><strong>10 flips:</strong> You might get 7 heads (70%) or 3 heads (30%). These proportions can vary quite a
    bit from the true value of 50%</li>
    <li><strong>100 flips:</strong> You're likely to get somewhere between 40 and 60 heads (40%-60%). Still some
    variability, but closer to 50%</li>
    <li><strong>1,000 flips:</strong> You'll probably get between 470 and 530 heads (47%-53%). Much closer to the true 50%</li>
    <li><strong>10,000 flips:</strong> You'll almost certainly get very close to 5,000 heads (very close to 50%)</li>
  </ul>

  <p>
    As the number of flips increases, the sample proportion gets closer and closer to the true probability. This is
    the law of large numbers in action.
  </p>

  <div class="critical-box">
    <h4>Critical Point</h4>
    <p>
      The law of large numbers is about convergence to the true value, not about "evening out" on small scales. If you
      flip 10 heads in a row, the next flip is still 50-50—the coin has no memory. The LLN operates over many trials,
      not by compensating for recent outcomes.
    </p>
  </div>

  <h3>8.2.3 Why the law of large numbers works</h3>

  <p>
    The mathematical reason the law of large numbers works is that sampling errors tend to cancel out over many observations:
  </p>

  <ul>
    <li>Some samples will produce estimates that are too high (overestimate the population parameter)</li>
    <li>Other samples will produce estimates that are too low (underestimate the population parameter)</li>
    <li>With random sampling, these errors are random and symmetric—they don't systematically favor one direction</li>
    <li>As sample size increases, the positive and negative errors increasingly cancel each other out</li>
    <li>The result is that larger samples produce estimates closer to the true value</li>
  </ul>

  <p>
    Think of it like hitting a target: each individual shot (small sample) might be off-target, but if you aim correctly
    (unbiased sampling) and take many shots (large sample), the average position of all your shots will be very close
    to the bullseye.
  </p>

  <h3>8.2.4 Implications for research</h3>

  <p>
    The law of large numbers has several important practical implications:
  </p>

  <p>
    <strong>1. Larger samples produce more precise estimates</strong><br>
    Standard error decreases as sample size increases, specifically by a factor of √n. Doubling your sample size reduces
    standard error by a factor of √2 ≈ 1.41. To cut standard error in half, you need four times as many participants.
  </p>

  <p>
    <strong>2. The LLN provides confidence in statistical inference</strong><br>
    We can be increasingly confident that our sample statistics approximate the true population parameters as sample
    size grows. This is why large surveys (e.g., n = 1,000) can accurately estimate population proportions within a
    few percentage points.
  </p>

  <p>
    <strong>3. The LLN does NOT fix bias</strong><br>
    This is crucial: the law of large numbers only works for <strong>unbiased</strong> estimates. If your sampling
    method is biased (e.g., only sampling college students to study all adults), increasing sample size just gives you
    a more precisely wrong answer. Larger samples reduce random error but cannot eliminate systematic bias.
  </p>

  <div class="critical-box">
    <h4>Important Distinction</h4>
    <p>
      <strong>Bias vs. Random error:</strong>
    </p>
    <ul>
      <li><strong>Random error:</strong> Natural variability in sample statistics due to random sampling—the LLN reduces this</li>
      <li><strong>Bias:</strong> Systematic error that pushes estimates consistently in one direction—the LLN does NOT reduce this</li>
    </ul>
    <p>
      A very large convenience sample of university students can give you a very precise estimate of the average IQ
      among university students, but it won't tell you the average IQ of the general population (which is likely lower).
    </p>
  </div>

  <h3>8.2.5 Law of large numbers vs. Central Limit Theorem</h3>

  <p>
    Students often confuse the law of large numbers with the Central Limit Theorem (discussed next). They're related
    but different:
  </p>

  <ul>
    <li><strong>Law of Large Numbers:</strong> Says that sample means converge to the population mean as n increases
    (a statement about accuracy)</li>
    <li><strong>Central Limit Theorem:</strong> Says that the sampling distribution of sample means approaches a normal
    distribution as n increases (a statement about shape)</li>
  </ul>

  <p>
    Both describe what happens with large samples, but they address different aspects: the LLN is about where the estimates
    center (convergence to μ), while the CLT is about the distribution's shape (approaches normal).
  </p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 8, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'central-limit-theorem',
    moduleId: 'module-6',
    title: 'Central Limit Theorem',
    description: 'Why sampling distributions of means are normal.',
    icon: 'T',
    contentHtml: `
<section class="module-content">
  <h2>8.3 Sampling distributions and the central limit theorem</h2>

  <p>
    The <strong>central limit theorem</strong> is one of the most remarkable and important results in statistics.
    It explains why the normal distribution appears so frequently in statistical inference, even when the data itself
    is not normally distributed.
  </p>

  <h3>8.3.1 The sampling distribution</h3>

  <p>
    Before understanding the central limit theorem, we need to understand what a <strong>sampling distribution</strong> is.
  </p>

  <div class="terminology-box">
    <h4>Sampling Distribution</h4>
    <p>
      The <strong>sampling distribution</strong> of a statistic is the probability distribution you would get if you:
    </p>
    <ol>
      <li>Drew many random samples of size n from the population</li>
      <li>Calculated the statistic (e.g., the mean) for each sample</li>
      <li>Made a histogram of all those statistics</li>
    </ol>
    <p>
      The sampling distribution describes how the statistic varies across different random samples.
    </p>
  </div>

  <p>
    <strong>Example:</strong> Suppose the population mean IQ is μ = 100 with σ = 15. If you take one sample of n = 25
    people, you might get a sample mean of M = 103. If you take another sample of 25 people, you might get M = 97. A
    third sample might give M = 101. If you repeated this thousands of times and made a histogram of all the sample means,
    that histogram is the sampling distribution of the mean.
  </p>

  <p>
    <strong>Key point:</strong> The sampling distribution is theoretical—it describes what would happen across all
    possible samples, not just the one sample you actually have. But understanding it is crucial for statistical inference.
  </p>

  <h3>8.3.2 The central limit theorem</h3>

  <p>
    The <strong>central limit theorem (CLT)</strong> makes a remarkable claim about the shape of sampling distributions:
  </p>

  <div class="critical-box">
    <h4>Central Limit Theorem</h4>
    <p>
      For a random sample of size n from <strong>any</strong> population with mean μ and finite standard deviation σ,
      the sampling distribution of the sample mean approaches a normal distribution as n increases.
    </p>
    <p>
      <strong>Specifically, the sampling distribution of M is approximately:</strong><br>
      M ~ N(μ, σ²/n)
    </p>
    <p>
      Or equivalently, the standard error of the mean is: SEM = σ / √n
    </p>
  </div>

  <p>
    The magic of the CLT is in the phrase "any population"—it doesn't matter if the population is normal, skewed,
    uniform, bimodal, or anything else. As long as the sample size is large enough, the sampling distribution of the
    mean will be approximately normal.
  </p>

  <h3>8.3.3 Demonstrating the CLT with dice</h3>

  <p>
    A classic demonstration uses dice rolls. Rolling a single six-sided die produces a uniform distribution—each value
    from 1 to 6 has probability 1/6. The distribution is completely flat, not normal at all.
  </p>

  <p>
    Now consider what happens when you roll multiple dice and take the average:
  </p>

  <ul>
    <li><strong>Roll 1 die:</strong> The distribution is uniform (flat). Mean = 3.5, SD = 1.71</li>
    <li><strong>Roll 2 dice and average them:</strong> The distribution of averages starts to look triangular, centered
    at 3.5. More concentrated near the middle</li>
    <li><strong>Roll 5 dice and average them:</strong> The distribution looks more bell-shaped and symmetric</li>
    <li><strong>Roll 30 dice and average them:</strong> The distribution is approximately normal, even though we started
    with a uniform distribution</li>
  </ul>

  <p>
    This demonstrates the CLT: even though individual die rolls are uniformly distributed (not normal), the distribution
    of sample means becomes normal as sample size increases.
  </p>

  <h3>8.3.4 Properties of the sampling distribution</h3>

  <p>
    The central limit theorem tells us three things about the sampling distribution of the mean:
  </p>

  <div class="terminology-box">
    <h4>Sampling Distribution of the Mean</h4>
    <ol>
      <li><strong>Shape:</strong> Approximately normal (for large n), regardless of the population's shape</li>
      <li><strong>Center:</strong> The mean of the sampling distribution equals the population mean (E[M] = μ)</li>
      <li><strong>Spread:</strong> The standard deviation of the sampling distribution (called the standard error) is
      σ / √n</li>
    </ol>
  </div>

  <p>
    The <strong>standard error of the mean (SEM)</strong> is particularly important:
  </p>
  <p style="margin-left: 20px;">
    SEM = σ / √n
  </p>

  <p>
    This formula shows that:
  </p>
  <ul>
    <li>Standard error decreases as sample size increases (√n is in the denominator)</li>
    <li>To cut SEM in half, you need 4 times as many observations (because √4 = 2)</li>
    <li>Larger samples produce more precise estimates—a direct result of the law of large numbers</li>
  </ul>

  <h3>8.3.5 How large does n need to be?</h3>

  <p>
    The CLT says the sampling distribution approaches normality as n increases, but how large is "large enough"?
  </p>

  <ul>
    <li><strong>If the population is already normal:</strong> The sampling distribution is exactly normal for any n,
    even n = 2</li>
    <li><strong>If the population is moderately skewed:</strong> n ≥ 30 is usually sufficient</li>
    <li><strong>If the population is heavily skewed or has extreme outliers:</strong> You may need n ≥ 100 or more</li>
    <li><strong>If the population is symmetric but not normal:</strong> Even n = 10-20 may be enough</li>
  </ul>

  <p>
    The "n ≥ 30 rule of thumb" is widely cited but is just a guideline. The more non-normal the population, the larger
    the sample needed for good approximation.
  </p>

  <h3>8.3.6 Why the CLT matters for statistical inference</h3>

  <p>
    The central limit theorem is the foundation of most classical statistical methods:
  </p>

  <div class="critical-box">
    <h4>Importance of the CLT</h4>
    <ol>
      <li><strong>Justifies using z and t distributions:</strong> Hypothesis tests about means (t-tests, ANOVA) rely
      on the assumption that sampling distributions are approximately normal—the CLT guarantees this for large samples</li>
      <li><strong>Enables confidence intervals:</strong> We can construct confidence intervals around sample means using
      the normal distribution, even if individual data points aren't normal</li>
      <li><strong>Explains ubiquity of the normal distribution:</strong> Many phenomena are sums or averages of many
      small independent factors—the CLT says such quantities will be normally distributed</li>
      <li><strong>Allows robust inference:</strong> We can make valid statistical inferences without needing to know
      the exact shape of the population distribution</li>
    </ol>
  </div>

  <p>
    <strong>Practical example:</strong> Suppose you want to estimate average income in a city. Individual incomes are
    heavily right-skewed (not normal). But thanks to the CLT, if you take a sample of n = 100 people, the sampling
    distribution of the mean income will be approximately normal. This allows you to calculate confidence intervals and
    conduct hypothesis tests using standard methods.
  </p>

  <h3>8.3.7 Limitations and misconceptions</h3>

  <p>
    <strong>What the CLT does NOT say:</strong>
  </p>
  <ul>
    <li>It does NOT say your data will become normal if you collect more of it. If the population is skewed, large
    samples will still show skewness in the raw data</li>
    <li>It does NOT apply to all statistics—it specifically applies to sample means (and sums). Other statistics have
    different sampling distributions</li>
    <li>It does NOT fix bias or poor sampling methods. A biased sampling method produces a biased estimate regardless
    of sample size</li>
  </ul>

  <p>
    <strong>Remember:</strong> The CLT is about the distribution of sample means across many hypothetical samples, not
    about the distribution of raw data in your one sample.
  </p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 8, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'parameter-estimation',
    moduleId: 'module-6',
    title: 'Parameter Estimation',
    description: 'Estimating population parameters from samples.',
    icon: 'T',
    contentHtml: `
<section class="module-content">
  <h2>8.4 Estimating population parameters</h2>

  <p>
    The central goal of statistical inference is to learn about population parameters from sample data. This section
    discusses how we estimate parameters like the population mean and standard deviation, and why some estimation
    methods are better than others.
  </p>

  <h3>8.4.1 Estimating the population mean</h3>

  <p>
    The most obvious way to estimate the population mean (μ) is to use the sample mean (M or X̄). This turns out to be
    an excellent choice.
  </p>

  <div class="terminology-box">
    <h4>Sample Mean as an Estimator</h4>
    <p>
      The sample mean M = (X₁ + X₂ + ... + Xₙ) / n is the standard estimator for the population mean μ.
    </p>
    <p>
      <strong>Key property:</strong> The sample mean is an <strong>unbiased estimator</strong> of μ. This means
      that across many different samples, the average of all sample means equals the true population mean.
    </p>
  </div>

  <p>
    <strong>Example:</strong> Suppose the true average IQ in a population is μ = 100. If you take one sample of 50
    people, you might get M = 102. Another sample might give M = 98. A third might give M = 101. These individual
    sample means vary, but if you average them across thousands of samples, that average will be very close to 100.
    This is what it means for the sample mean to be unbiased.
  </p>

  <h3>8.4.2 Estimating the population standard deviation</h3>

  <p>
    Estimating the population standard deviation (σ) is trickier than estimating the mean. There's a subtle issue that
    requires a correction.
  </p>

  <p>
    You might think we should calculate the sample standard deviation using the formula:
  </p>
  <p style="margin-left: 20px;">
    s = √[ Σ(Xᵢ - M)² / n ]
  </p>

  <p>
    This formula calculates the average squared deviation from the sample mean. It seems reasonable, but it has a problem:
    it tends to <strong>underestimate</strong> the population standard deviation σ.
  </p>

  <h3>8.4.3 The n-1 correction</h3>

  <p>
    To get an unbiased estimate of the population variance (σ²), we use a slightly different formula:
  </p>

  <div class="critical-box">
    <h4>Sample Variance and Standard Deviation</h4>
    <p>
      <strong>Sample variance:</strong> s² = Σ(Xᵢ - M)² / (n - 1)
    </p>
    <p>
      <strong>Sample standard deviation:</strong> s = √[ Σ(Xᵢ - M)² / (n - 1) ]
    </p>
    <p>
      Notice we divide by <strong>n - 1</strong>, not n. This is called the <strong>degrees of freedom correction</strong>
      or <strong>Bessel's correction</strong>.
    </p>
  </div>

  <p>
    <strong>Why n - 1?</strong><br>
    When you calculate deviations from the sample mean (Xᵢ - M), these deviations are not entirely independent because
    they must sum to zero. You've "used up" one degree of freedom in estimating M, leaving only n - 1 independent pieces
    of information for estimating variability.
  </p>

  <p>
    More intuitively: the sample mean M is the center point that minimizes squared deviations in your sample. By definition,
    it makes the deviations smaller than they would be around the true population mean μ (which is probably different from M).
    Dividing by n - 1 instead of n compensates for this, giving a slightly larger (and unbiased) estimate of σ².
  </p>

  <div class="critical-box">
    <h4>Critical Point</h4>
    <p>
      The n - 1 correction is crucial for small samples. With n = 5, dividing by 4 instead of 5 makes a noticeable
      difference. With n = 1000, dividing by 999 vs 1000 barely matters. Statistical software (including jamovi)
      automatically uses n - 1 when calculating sample standard deviations.
    </p>
  </div>

  <h3>8.4.4 Unbiased estimators</h3>

  <p>
    An estimator is <strong>unbiased</strong> if its expected value (the average across infinitely many samples) equals
    the true parameter value.
  </p>

  <div class="terminology-box">
    <h4>Unbiased Estimators</h4>
    <ul>
      <li><strong>Sample mean M</strong> is an unbiased estimator of population mean μ</li>
      <li><strong>Sample variance s²</strong> (using n - 1) is an unbiased estimator of population variance σ²</li>
      <li><strong>Sample proportion p̂</strong> is an unbiased estimator of population proportion p</li>
    </ul>
  </div>

  <p>
    <strong>Note:</strong> While s² is an unbiased estimator of σ², the sample standard deviation s is technically
    a slightly biased estimator of σ (because of the square root). However, the bias is very small and decreases rapidly
    with sample size, so in practice we use s to estimate σ.
  </p>

  <h3>8.4.5 Standard error of the mean</h3>

  <p>
    The sample mean M varies from sample to sample. The <strong>standard error of the mean (SEM)</strong> quantifies
    this variability—it's the standard deviation of the sampling distribution of M.
  </p>

  <div class="terminology-box">
    <h4>Standard Error of the Mean</h4>
    <p>
      <strong>If we know σ:</strong> SEM = σ / √n
    </p>
    <p>
      <strong>If we estimate σ from the sample:</strong> SEM = s / √n
    </p>
    <p>
      The SEM tells us how much the sample mean typically varies around the population mean due to sampling error.
    </p>
  </div>

  <p>
    <strong>Example:</strong> Suppose you're measuring IQ (population σ = 15) with a sample of n = 25 people.
  </p>
  <p style="margin-left: 20px;">
    SEM = 15 / √25 = 15 / 5 = 3
  </p>
  <p>
    This means sample means will typically vary by about 3 IQ points around the true population mean. With n = 100:
  </p>
  <p style="margin-left: 20px;">
    SEM = 15 / √100 = 15 / 10 = 1.5
  </p>
  <p>
    Larger samples have smaller standard errors—they give more precise estimates.
  </p>

  <h3>8.4.6 Point estimates vs. interval estimates</h3>

  <p>
    A <strong>point estimate</strong> is a single number (e.g., M = 103.5 is our estimate of μ). Point estimates are
    simple but provide no information about uncertainty.
  </p>

  <p>
    An <strong>interval estimate</strong> (or confidence interval, discussed next) provides a range of plausible values
    for the parameter (e.g., we estimate μ is between 98 and 109). Interval estimates communicate both the estimate and
    the uncertainty.
  </p>

  <div class="critical-box">
    <h4>Critical Point</h4>
    <p>
      When reporting parameter estimates, always include a measure of uncertainty—either the standard error or
      (better yet) a confidence interval. A point estimate alone can be misleading because it doesn't tell you how
      precise or imprecise it is.
    </p>
  </div>

  <p>
    <strong>Example comparison:</strong>
  </p>
  <ul>
    <li><strong>Poor reporting:</strong> "The average reaction time was 450 ms."</li>
    <li><strong>Better reporting:</strong> "The average reaction time was 450 ms (SEM = 25 ms)."</li>
    <li><strong>Best reporting:</strong> "The average reaction time was 450 ms, 95% CI [400, 500]."</li>
  </ul>

  <p>
    The last version communicates both the estimate and the precision, allowing readers to judge how confident they
    should be in the result.
  </p>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 8, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },
  {
    id: 'confidence-intervals',
    moduleId: 'module-6',
    title: 'Confidence Intervals',
    description: 'Constructing and interpreting confidence intervals.',
    icon: 'T',
    contentHtml: `
<section class="module-content">
  <h2>8.5 Estimating a confidence interval</h2>

  <p>
    Point estimates (like the sample mean) provide our best guess for a parameter, but they don't convey any information
    about uncertainty. A <strong>confidence interval</strong> solves this problem by providing a range of plausible
    values for the parameter, along with a specified level of confidence.
  </p>

  <h3>8.5.1 What is a confidence interval?</h3>

  <div class="terminology-box">
    <h4>Confidence Interval</h4>
    <p>
      A <strong>confidence interval (CI)</strong> is a range of values that is likely to contain the true population
      parameter. It is constructed from sample data and has an associated <strong>confidence level</strong> (usually 95%).
    </p>
    <p>
      A 95% confidence interval means: if we repeated this study many times and calculated a 95% CI each time, about
      95% of those intervals would contain the true population parameter.
    </p>
  </div>

  <p>
    <strong>Example:</strong> Suppose you measure IQ in a sample of 100 people and calculate M = 103.2, with s = 14.5.
    A 95% confidence interval might be [100.3, 106.1]. This means you're 95% confident the true population mean IQ lies
    somewhere between 100.3 and 106.1.
  </p>

  <h3>8.5.2 Constructing a confidence interval for the mean</h3>

  <p>
    The general formula for a confidence interval is:
  </p>

  <div class="critical-box">
    <h4>Confidence Interval Formula</h4>
    <p>
      CI = Estimate ± (Critical value × Standard error)
    </p>
    <p>
      For the mean:<br>
      <strong>CI = M ± (t* × SEM)</strong>
    </p>
    <p>
      where:
    </p>
    <ul>
      <li><strong>M</strong> is the sample mean</li>
      <li><strong>SEM</strong> is the standard error of the mean = s / √n</li>
      <li><strong>t*</strong> is the critical value from the t-distribution with df = n - 1</li>
    </ul>
  </div>

  <p>
    <strong>Why t-distribution?</strong> We use the t-distribution (not the normal distribution) because we're estimating
    σ from the sample. For large samples (n > 30), t and z are nearly identical, but for small samples, the t-distribution's
    heavier tails provide appropriate coverage.
  </p>

  <p>
    <strong>Critical values:</strong> The critical value t* depends on both the desired confidence level and the degrees
    of freedom (df = n - 1). For a 95% CI:
  </p>
  <ul>
    <li>n = 10 (df = 9): t* ≈ 2.26</li>
    <li>n = 30 (df = 29): t* ≈ 2.05</li>
    <li>n = 100 (df = 99): t* ≈ 1.98</li>
    <li>n = ∞: t* = 1.96 (approaches the z critical value)</li>
  </ul>

  <h3>8.5.3 A worked example</h3>

  <p>
    Suppose you measure reaction times for 25 participants. You find:
  </p>
  <ul>
    <li>Sample mean: M = 420 ms</li>
    <li>Sample standard deviation: s = 80 ms</li>
    <li>Sample size: n = 25</li>
  </ul>

  <p>
    <strong>Step 1: Calculate the standard error</strong>
  </p>
  <p style="margin-left: 20px;">
    SEM = s / √n = 80 / √25 = 80 / 5 = 16 ms
  </p>

  <p>
    <strong>Step 2: Find the critical value</strong><br>
    For 95% CI with df = 25 - 1 = 24, the critical value is t* ≈ 2.064 (look up in t-table or use software)
  </p>

  <p>
    <strong>Step 3: Calculate the margin of error</strong>
  </p>
  <p style="margin-left: 20px;">
    Margin of error = t* × SEM = 2.064 × 16 = 33.0 ms
  </p>

  <p>
    <strong>Step 4: Construct the confidence interval</strong>
  </p>
  <p style="margin-left: 20px;">
    Lower bound = M - margin of error = 420 - 33 = 387 ms<br>
    Upper bound = M + margin of error = 420 + 33 = 453 ms
  </p>

  <p>
    <strong>Result:</strong> 95% CI [387, 453] ms
  </p>

  <p>
    <strong>Interpretation:</strong> We are 95% confident that the true average reaction time in the population lies
    between 387 and 453 milliseconds.
  </p>

  <h3>8.5.4 Interpreting confidence intervals</h3>

  <p>
    Confidence intervals are frequently misinterpreted. Here's the correct interpretation and common mistakes:
  </p>

  <div class="critical-box">
    <h4>Correct Interpretation</h4>
    <p>
      <strong>Correct:</strong> "We are 95% confident that the true population mean lies within this interval."
    </p>
    <p>
      Or more technically: "If we repeated this study many times and calculated a 95% CI each time, approximately 95%
      of those intervals would contain the true population mean."
    </p>
  </div>

  <p>
    <strong>Common misinterpretations to avoid:</strong>
  </p>
  <ul>
    <li><strong>WRONG:</strong> "There is a 95% probability that the true mean is in this interval."<br>
    <em>Why wrong:</em> From a frequentist perspective, the true mean is a fixed value (not random), and the interval
    is random (varies from sample to sample). The true mean either is or isn't in this specific interval—probability
    doesn't apply to fixed values</li>

    <li><strong>WRONG:</strong> "95% of the data falls within this interval."<br>
    <em>Why wrong:</em> The CI is about the population parameter (mean), not about individual data points. Most data
    points typically fall far outside the CI for the mean</li>

    <li><strong>WRONG:</strong> "If we collect more data, there's a 95% chance the new mean will fall in this interval."<br>
    <em>Why wrong:</em> The CI is specific to this sample. A new sample would produce a different CI</li>
  </ul>

  <h3>8.5.5 Factors affecting confidence interval width</h3>

  <p>
    Three factors determine how wide or narrow a confidence interval is:
  </p>

  <p>
    <strong>1. Sample size (n)</strong><br>
    Larger samples → narrower CIs. Doubling the sample size reduces CI width by a factor of √2 ≈ 1.41. To halve the
    width, you need 4 times as many participants.
  </p>

  <p>
    <strong>Example:</strong> With n = 25, SEM = 16 ms. With n = 100, SEM = 8 ms. The CI for n = 100 will be roughly
    half as wide.
  </p>

  <p>
    <strong>2. Sample variability (s)</strong><br>
    More variable data → wider CIs. If individual measurements are spread out, there's more uncertainty about the mean.
  </p>

  <p>
    <strong>Example:</strong> Reaction times with s = 40 ms produce narrower CIs than reaction times with s = 120 ms
    (assuming same n).
  </p>

  <p>
    <strong>3. Confidence level</strong><br>
    Higher confidence → wider CIs. If you want to be more confident (e.g., 99% instead of 95%), you must accept a
    wider interval.
  </p>

  <ul>
    <li>90% CI: narrowest, less confident</li>
    <li>95% CI: standard choice, balances precision and confidence</li>
    <li>99% CI: widest, more confident</li>
  </ul>

  <h3>8.5.6 Confidence intervals in jamovi</h3>

  <p>
    jamovi automatically calculates confidence intervals for many statistics. When you run descriptive statistics or
    statistical tests, you can request CIs:
  </p>

  <ul>
    <li><strong>Descriptives:</strong> Check "Confidence interval" under "Statistics" to get CIs for means</li>
    <li><strong>t-tests:</strong> jamovi reports CIs for mean differences</li>
    <li><strong>Regression:</strong> CIs are provided for regression coefficients</li>
  </ul>

  <p>
    You can typically choose the confidence level (90%, 95%, or 99%). The default is usually 95%.
  </p>

  <h3>8.5.7 Using confidence intervals for inference</h3>

  <p>
    Confidence intervals serve multiple purposes:
  </p>

  <p>
    <strong>1. Communicate uncertainty</strong><br>
    Reporting "M = 420 ms, 95% CI [387, 453]" is far more informative than just "M = 420 ms" because it shows precision.
  </p>

  <p>
    <strong>2. Assess practical significance</strong><br>
    Even if a difference is statistically significant, the CI shows whether it's large enough to matter. A CI of [0.1, 0.2]
    might be statistically significant but practically trivial.
  </p>

  <p>
    <strong>3. Informal hypothesis testing</strong><br>
    If a 95% CI for a mean doesn't include a hypothesized value (e.g., μ = 400), you can reject the hypothesis at the
    α = 0.05 level. This corresponds to a two-tailed hypothesis test.
  </p>

  <div class="critical-box">
    <h4>Critical Point</h4>
    <p>
      Confidence intervals are generally more informative than p-values because they show both the estimated effect size
      and the precision of that estimate. Modern statistical reporting increasingly emphasizes CIs over p-values.
    </p>
  </div>

  <div class="attribution">
    <p><em>Content adapted from "Learning Statistics with jamovi" by Danielle J. Navarro and David R. Foxcroft, Chapter 8, licensed under CC BY-SA 4.0.</em></p>
  </div>
</section>
`
  },

  // Module 7: Hypothesis Testing
  {
    id: 'hypothesis-testing',
    moduleId: 'module-7',
    title: 'Hypothesis Testing Logic',
    description: 'Null and alternative hypotheses, decision making.',
    icon: 'T',
    contentHtml: `
<section class="module-content">
  <h2>9. Hypothesis Testing</h2>

  <blockquote class="chapter-quote">
    <p>The process of induction is the process of assuming the simplest law that can be made to harmonize with our experience. This process, however, has no logical foundation but only a psychological one. It is clear that there are no grounds for believing that the simplest course of events will really happen. It is an hypothesis that the sun will rise tomorrow: and this means that we do not know whether it will rise.</p>
    <footer>– Ludwig Wittgenstein</footer>
  </blockquote>

  <p>
    In the last chapter we discussed the ideas behind estimation, which is one of the two "big ideas" in inferential statistics. It's now time to turn our attention to the other big idea, which is <strong>hypothesis testing</strong>. In its most abstract form, hypothesis testing is really a very simple idea. The researcher has some theory about the world and wants to determine whether or not the data actually support that theory. However, the details are messy and most people find the theory of hypothesis testing to be the most frustrating part of statistics.
  </p>

  <h3>9.1 A Menagerie of Hypotheses</h3>

  <p>
    Eventually we all succumb to madness. Suppose we want to test whether clairvoyance exists. Each participant sits down at a table and is shown a card by an experimenter. The card is black on one side and white on the other. The experimenter takes the card away and places it on a table in an adjacent room. The card is placed black side up or white side up completely at random, with the randomisation occurring only after the experimenter has left the room with the participant. A second experimenter comes in and asks the participant which side of the card is now facing upwards.
  </p>

  <p>
    My data set, therefore, is very simple. I have asked the question of <em>N</em> people and some number <em>X</em> of these people have given the correct response. To make things concrete, let's suppose that I have tested <em>N</em> = 100 people and <em>X</em> = 62 of these got the answer right. A surprisingly large number, sure, but is it large enough for me to feel safe in claiming I've found evidence for ESP? This is the situation where hypothesis testing comes in useful.
  </p>

  <h4>9.1.1 Research Hypotheses versus Statistical Hypotheses</h4>

  <p>
    The first distinction that you need to keep clear in your mind is between <strong>research hypotheses</strong> and <strong>statistical hypotheses</strong>. In my ESP study my overall scientific goal is to demonstrate that clairvoyance exists. In this situation I have a clear research goal: I am hoping to discover evidence for ESP. Regardless of how I want to portray myself, the basic point that I'm trying to convey here is that a research hypothesis involves making a substantive, testable scientific claim.
  </p>

  <div class="terminology-box">
    <h4>Examples of Research Hypotheses</h4>
    <ul>
      <li><strong>Listening to music reduces your ability to pay attention to other things.</strong> This is a claim about the causal relationship between two psychologically meaningful concepts (listening to music and paying attention to things), so it's a perfectly reasonable research hypothesis.</li>
      <li><strong>Intelligence is related to personality.</strong> Like the last one, this is a relational claim about two psychological constructs (intelligence and personality), but the claim is weaker: correlational not causal.</li>
      <li><strong>Intelligence is speed of information processing.</strong> This hypothesis has a quite different character. It's not actually a relational claim at all. It's an ontological claim about the fundamental character of intelligence.</li>
    </ul>
  </div>

  <p>
    <strong>Statistical hypotheses</strong> are neither messy nor scientific claims. Statistical hypotheses must be mathematically precise and they must correspond to specific claims about the characteristics of the data generating mechanism (i.e., the "population"). Even so, the intent is that statistical hypotheses bear a clear relationship to the substantive research hypotheses that you care about!
  </p>

  <p>
    For instance, in my ESP study my research hypothesis is that some people are able to see through walls or whatever. What I want to do is to "map" this onto a statement about how the data were generated. The quantity that I'm interested in within the experiment is P("correct"), the true-but-unknown probability with which the participants in my experiment answer the question correctly. Let's use the Greek letter θ (theta) to refer to this probability.
  </p>

  <div class="terminology-box">
    <h4>Examples of Statistical Hypotheses</h4>
    <ul>
      <li><strong>θ = 0.5:</strong> If ESP doesn't exist and if my experiment is well designed then my participants are just guessing. So I should expect them to get it right half of the time.</li>
      <li><strong>θ > 0.5:</strong> Alternatively, suppose ESP does exist and participants can see the card. If that's true people will perform better than chance.</li>
      <li><strong>θ < 0.5:</strong> A third possibility is that ESP does exist, but the colours are all reversed and people don't realise it. If that's how it works then you'd expect people's performance to be below chance.</li>
      <li><strong>θ ≠ 0.5:</strong> Finally, suppose ESP exists but I have no idea whether people are seeing the right colour or the wrong one. In that case the only claim I could make about the data would be that the probability of making the correct answer is not equal to 0.5.</li>
    </ul>
  </div>

  <div class="important-callout">
    <h4>Key Point</h4>
    <p>
      When attempting to construct a statistical hypothesis test the researcher actually has two quite distinct hypotheses to consider. First, they have a <strong>research hypothesis</strong> (a claim about psychology), and this then corresponds to a <strong>statistical hypothesis</strong> (a claim about the data generating population).
    </p>
    <p>
      In my ESP example these might be:<br>
      <strong>Research hypothesis:</strong> "ESP exists"<br>
      <strong>Statistical hypothesis:</strong> θ ≠ 0.5
    </p>
    <p>
      A statistical hypothesis test is a test of the statistical hypothesis, not the research hypothesis. If your study is badly designed then the link between your research hypothesis and your statistical hypothesis is broken.
    </p>
  </div>

  <h4>9.1.2 Null Hypotheses and Alternative Hypotheses</h4>

  <p>
    So far, so good. I have a research hypothesis that corresponds to what I want to believe about the world, and I can map it onto a statistical hypothesis that corresponds to what I want to believe about how the data were generated. It's at this point that things get somewhat counter-intuitive for a lot of people. Because what I'm about to do is invent a new statistical hypothesis (the "null" hypothesis, H₀) that corresponds to the exact opposite of what I want to believe, and then focus exclusively on that almost to the neglect of the thing I'm actually interested in (which is now called the "alternative" hypothesis, H₁).
  </p>

  <p>
    In our ESP example, the <strong>null hypothesis</strong> is that θ = 0.5, since that's what we'd expect if ESP didn't exist. My hope, of course, is that ESP is totally real and so the <strong>alternative</strong> to this null hypothesis is θ ≠ 0.5. In essence, what we're doing here is dividing up the possible values of θ into two groups: those values that I really hope aren't true (the null), and those values that I'd be happy with if they turn out to be right (the alternative).
  </p>

  <p>
    Having done so, the important thing to recognise is that <strong>the goal of a hypothesis test is not to show that the alternative hypothesis is (probably) true. The goal is to show that the null hypothesis is (probably) false.</strong> Most people find this pretty weird.
  </p>

  <div class="analogy-box">
    <h4>The Criminal Trial Analogy</h4>
    <p>
      The best way to think about it is to imagine that a hypothesis test is a <strong>criminal trial</strong>, the trial of the null hypothesis. The null hypothesis is the defendant, the researcher is the prosecutor, and the statistical test itself is the judge.
    </p>
    <p>
      Just like a criminal trial, there is a <strong>presumption of innocence</strong>. The null hypothesis is deemed to be true unless you, the researcher, can prove beyond a reasonable doubt that it is false. You are free to design your experiment however you like, and your goal when doing so is to maximise the chance that the data will yield a conviction for the crime of being false.
    </p>
    <p>
      The catch is that the statistical test sets the rules of the trial and those rules are designed to protect the null hypothesis, specifically to ensure that if the null hypothesis is actually true the chances of a false conviction are guaranteed to be low. This is pretty important. After all, the null hypothesis doesn't get a lawyer, and given that the researcher is trying desperately to prove it to be false someone has to protect it.
    </p>
  </div>

  <h3>9.2 Two Types of Errors</h3>

  <p>
    Before going into details about how a statistical test is constructed it's useful to understand the philosophy behind it. Ideally, we would like to construct our test so that we never make any errors. Unfortunately, since the world is messy, this is never possible. Sometimes you're just really unlucky. For instance, suppose you flip a coin 10 times in a row and it comes up heads all 10 times. That feels like very strong evidence for a conclusion that the coin is biased, but of course there's a 1 in 1024 chance that this would happen even if the coin was totally fair.
  </p>

  <p>
    In other words, in real life we always have to accept that there's a chance that we made a mistake. As a consequence the goal behind statistical hypothesis testing is not to <em>eliminate</em> errors, but to <em>minimise</em> them.
  </p>

  <p>
    At this point, we need to be a bit more precise about what we mean by "errors". First, let's state the obvious. It is either the case that the null hypothesis is true or that it is false, and our test will either retain the null hypothesis or reject it. So, after we run the test and make our choice one of four things might have happened:
  </p>

  <table class="statistics-table">
    <thead>
      <tr>
        <th></th>
        <th>Retain H₀</th>
        <th>Reject H₀</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>H₀ is true</strong></td>
        <td>Correct decision</td>
        <td>Error (<strong>Type I</strong>)</td>
      </tr>
      <tr>
        <td><strong>H₀ is false</strong></td>
        <td>Error (<strong>Type II</strong>)</td>
        <td>Correct decision</td>
      </tr>
    </tbody>
  </table>

  <div class="terminology-box">
    <h4>Types of Errors</h4>
    <ul>
      <li><strong>Type I error:</strong> If we reject a null hypothesis that is actually true then we have made a Type I error.</li>
      <li><strong>Type II error:</strong> On the other hand, if we retain the null hypothesis when it is in fact false then we have made a Type II error.</li>
    </ul>
  </div>

  <p>
    Remember how I said that statistical testing was kind of like a criminal trial? Well, I meant it. A criminal trial requires that you establish "beyond a reasonable doubt" that the defendant did it. All of the evidential rules are designed to ensure that there's (almost) no chance of wrongfully convicting an innocent defendant. The trial is designed to protect the rights of a defendant. As the English jurist William Blackstone famously said, it is "better that ten guilty persons escape than that one innocent suffer."
  </p>

  <p>
    In other words, a criminal trial doesn't treat the two types of error in the same way. Punishing the innocent is deemed to be much worse than letting the guilty go free. <strong>A statistical test is pretty much the same.</strong> The single most important design principle of the test is to control the probability of a Type I error, to keep it below some fixed probability. This probability, which is denoted α, is called the <strong>significance level</strong> of the test.
  </p>

  <div class="important-callout">
    <h4>Significance Level (α)</h4>
    <p>
      A hypothesis test is said to have significance level α if the Type I error rate is no larger than α.
    </p>
    <p>
      By convention, scientists make use of three different α levels: <strong>.05, .01, and .001</strong>.
    </p>
  </div>

  <p>
    So, what about the Type II error rate? Well, we'd also like to keep those under control too, and we denote this probability by β. However, it's much more common to refer to the <strong>power</strong> of the test, that is the probability with which we reject a null hypothesis when it really is false, which is 1 − β.
  </p>

  <table class="statistics-table">
    <thead>
      <tr>
        <th></th>
        <th>Retain H₀</th>
        <th>Reject H₀</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>H₀ is true</strong></td>
        <td>1 − α (probability of correct retention)</td>
        <td>α (Type I error rate)</td>
      </tr>
      <tr>
        <td><strong>H₀ is false</strong></td>
        <td>β (Type II error rate)</td>
        <td>1 − β (power of the test)</td>
      </tr>
    </tbody>
  </table>

  <p>
    A "powerful" hypothesis test is one that has a small value of β, while still keeping α fixed at some (small) desired level. Notice the asymmetry here; the tests are designed to ensure that the α level is kept small but there's no corresponding guarantee regarding β. We'd certainly like the Type II error rate to be small and we try to design tests that keep it small, but this is typically secondary to the overwhelming need to control the Type I error rate.
  </p>

  <div class="critical-thinking-box">
    <h4>Blackstone's Formulation for Statistics</h4>
    <p>
      As Blackstone might have said if he were a statistician, it is "better to retain 10 false null hypotheses than to reject a single true one". To be honest, I don't know that I agree with this philosophy. There are situations where I think it makes sense, and situations where I think it doesn't, but that's neither here nor there. It's how the tests are built.
    </p>
  </div>
</section>
    `
  },
  {
    id: 'p-values',
    moduleId: 'module-7',
    title: 'Understanding P-Values',
    description: 'What p-values mean and common misinterpretations.',
    icon: 'T',
    contentHtml: `
<section class="module-content">
  <h2>Understanding P-Values</h2>

  <blockquote class="chapter-quote">
    <p>Like other occult techniques of divination, the statistical method has a private jargon deliberately contrived to obscure its methods from non-practitioners.</p>
    <footer>– Attributed to G. O. Ashley</footer>
  </blockquote>

  <h3>9.5 The p Value of a Test</h3>

  <p>
    In one sense, our hypothesis test is complete. We've constructed a test statistic, figured out its sampling distribution if the null hypothesis is true, and then constructed the critical region for the test. Nevertheless, I've actually omitted the most important number of all, the <strong>p value</strong>. It is to this topic that we now turn.
  </p>

  <p>
    There are two somewhat different ways of interpreting a p value, one proposed by Sir Ronald Fisher and the other by Jerzy Neyman. Both versions are legitimate, though they reflect very different ways of thinking about hypothesis tests. Most introductory textbooks tend to give Fisher's version only, but I think that's a bit of a shame. To my mind, Neyman's version is cleaner and actually better reflects the logic of the null hypothesis test.
  </p>

  <h4>9.5.1 A Softer View of Decision Making (Neyman's Approach)</h4>

  <p>
    One problem with the hypothesis testing procedure that I've described is that it makes no distinction at all between a result that is "barely significant" and those that are "highly significant". For instance, in my ESP study the data I obtained only just fell inside the critical region, so I did get a significant effect but it was a pretty near thing. In contrast, suppose that I'd run a study in which <em>X</em> = 97 out of my <em>N</em> = 100 participants got the answer right. This would obviously be significant too but by a much larger margin, such that there's really no ambiguity about this at all. The procedure that I have already described makes no distinction between the two.
  </p>

  <p>
    This is where the <strong>p value</strong> comes in handy. To understand how it works, let's suppose that we ran lots of hypothesis tests on the same data set, but with a different value of α in each case. When we test the ESP data (<em>X</em> = 62 successes out of <em>N</em> = 100 observations), using α levels of .03 and above, we'd always find ourselves rejecting the null hypothesis. For α levels of .02 and below we always end up retaining the null hypothesis.
  </p>

  <p>
    Therefore, somewhere between .02 and .03 there must be a smallest value of α that would allow us to reject the null hypothesis for this data. This is the p value. As it turns out the ESP data has <em>p</em> = .021.
  </p>

  <div class="important-callout">
    <h4>Definition of p-value (Neyman's Version)</h4>
    <p>
      <strong>p</strong> is defined to be the smallest Type I error rate (α) that you have to be willing to tolerate if you want to reject the null hypothesis.
    </p>
    <p>
      If it turns out that <em>p</em> describes an error rate that you find intolerable, then you must retain the null. If you're comfortable with an error rate equal to <em>p</em>, then it's okay to reject the null hypothesis in favour of your preferred alternative.
    </p>
  </div>

  <p>
    In effect, <em>p</em> is a summary of all the possible hypothesis tests that you could have run, taken across all possible α values. And as a consequence it has the effect of "softening" our decision process. For those tests in which <em>p</em> ≤ α you would have rejected the null hypothesis, whereas for those tests in which <em>p</em> > α you would have retained the null.
  </p>

  <p>
    In my ESP study I obtained <em>X</em> = 62 and as a consequence I've ended up with <em>p</em> = .021. So the error rate I have to tolerate is 2.1%. In contrast, suppose my experiment had yielded <em>X</em> = 97. What happens to my p value now? This time it's shrunk to <em>p</em> = 1.36×10⁻²⁵, which is a tiny, tiny Type I error rate. For this second case I would be able to reject the null hypothesis with a lot more confidence, because I only have to be "willing" to tolerate a type I error rate of about 1 in 10 trillion trillion in order to justify my decision to reject.
  </p>

  <h4>9.5.2 The Probability of Extreme Data (Fisher's Approach)</h4>

  <p>
    The second definition of the p-value comes from Sir Ronald Fisher, and it's actually this one that you tend to see in most introductory statistics textbooks. Notice how, when I constructed the critical region, it corresponded to the <strong>tails</strong> (i.e., extreme values) of the sampling distribution? That's not a coincidence, almost all "good" tests have this characteristic. The reason for that is that a good critical region almost always corresponds to those values of the test statistic that are least likely to be observed if the null hypothesis is true.
  </p>

  <div class="terminology-box">
    <h4>Fisher's Definition of p-value</h4>
    <p>
      If this rule is true, then we can define the p-value as the <strong>probability that we would have observed a test statistic that is at least as extreme as the one we actually did get</strong>.
    </p>
    <p>
      In other words, if the data are extremely implausible according to the null hypothesis, then the null hypothesis is probably wrong.
    </p>
  </div>

  <h4>9.5.3 A Common Mistake</h4>

  <p>
    Okay, so you can see that there are two rather different but legitimate ways to interpret the p value, one based on Neyman's approach to hypothesis testing and the other based on Fisher's. Unfortunately, there is a third explanation that people sometimes give, especially when they're first learning statistics, and it is <strong>absolutely and completely wrong</strong>.
  </p>

  <div class="warning-box">
    <h4>⚠️ WRONG Interpretation</h4>
    <p>
      This mistaken approach is to refer to the p value as "the probability that the null hypothesis is true". It's an intuitively appealing way to think, but it's wrong in two key respects:
    </p>
    <ol>
      <li><strong>Frequentist tool:</strong> Null hypothesis testing is a frequentist tool and the frequentist approach to probability does not allow you to assign probabilities to the null hypothesis. According to this view of probability, the null hypothesis is either true or it is not, it cannot have a "5% chance" of being true.</li>
      <li><strong>Mathematical inconsistency:</strong> Even within the Bayesian approach, which does let you assign probabilities to hypotheses, the p value would not correspond to the probability that the null is true. This interpretation is entirely inconsistent with the mathematics of how the p value is calculated.</li>
    </ol>
    <p class="emphasis">
      <strong>Put bluntly, despite the intuitive appeal of thinking this way, there is no justification for interpreting a p value this way. Never do it.</strong>
    </p>
  </div>

  <h3>9.6 Reporting the Results of a Hypothesis Test</h3>

  <p>
    When writing up the results of a hypothesis test there's usually several pieces of information that you need to report, but it varies a fair bit from test to test. Throughout the rest of the book I'll spend a little time talking about how to report the results of different tests, so that you can get a feel for how it's usually done. However, regardless of what test you're doing, the one thing that you always have to do is <strong>say something about the p value and whether or not the outcome was significant</strong>.
  </p>

  <h4>9.6.1 The Issue</h4>

  <p>
    To see why this is an issue, the key thing to recognise is that <em>p</em> values are terribly convenient. In practice, the fact that we can compute a <em>p</em> value means that we don't actually have to specify any α level at all in order to run the test. Instead, what you can do is calculate your <em>p</em> value and interpret it directly. If you get <em>p</em> = .062, then it means that you'd have to be willing to tolerate a Type I error rate of 6.2% to justify rejecting the null.
  </p>

  <p>
    This flexibility is both the advantage and the disadvantage to the <em>p</em> value. The reason why a lot of people don't like the idea of reporting an exact <em>p</em> value is that it gives the researcher a bit too much freedom. In particular, it lets you change your mind about what error tolerance you're willing to put up with <em>after</em> you look at the data.
  </p>

  <div class="analogy-box">
    <h4>The Danger of Post-hoc α Selection</h4>
    <p>
      For instance, consider my ESP experiment. Suppose I ran my test and ended up with a p value of .09. Should I accept or reject? Now, to be honest, I haven't yet bothered to think about what level of Type I error I'm "really" willing to accept. I don't have an opinion on that topic. But I do have an opinion about whether or not ESP exists, and I definitely have an opinion about whether my research should be published in a reputable scientific journal.
    </p>
    <p>
      And amazingly, now that I've looked at the data I'm starting to think that a 9% error rate isn't so bad, especially when compared to how annoying it would be to have to admit to the world that my experiment has failed. So, to avoid looking like I just made it up after the fact, I now say that my α is .1, with the argument that a 10% type I error rate isn't too bad and at that level my test is significant! I win.
    </p>
    <p>
      In other words, the worry here is that I might have the best of intentions, and be the most honest of people, but the temptation to just "shade" things a little bit here and there is really, really strong.
    </p>
  </div>

  <h4>9.6.2 Two Proposed Solutions</h4>

  <p>
    In practice, it's pretty rare for a researcher to specify a single α level ahead of time. Instead, the convention is that scientists rely on three standard significance levels: <strong>.05, .01 and .001</strong>. When reporting your results, you indicate which (if any) of these significance levels allow you to reject the null hypothesis.
  </p>

  <table class="statistics-table">
    <caption>Commonly Adopted Convention for Reporting p Values</caption>
    <thead>
      <tr>
        <th>Usual notation</th>
        <th>Significance stars</th>
        <th>English translation</th>
        <th>The null is...</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><em>p</em> > .05</td>
        <td></td>
        <td>The test wasn't significant</td>
        <td>Retained</td>
      </tr>
      <tr>
        <td><em>p</em> < .05</td>
        <td>*</td>
        <td>The test was significant at α = .05 but not at α = .01 or α = .001</td>
        <td>Rejected</td>
      </tr>
      <tr>
        <td><em>p</em> < .01</td>
        <td>**</td>
        <td>The test was significant at α = .05 and α = .01 but not at α = .001</td>
        <td>Rejected</td>
      </tr>
      <tr>
        <td><em>p</em> < .001</td>
        <td>***</td>
        <td>The test was significant at all levels</td>
        <td>Rejected</td>
      </tr>
    </tbody>
  </table>

  <p>
    This allows us to soften the decision rule a little bit, since <em>p</em> < .01 implies that the data meet a stronger evidential standard than <em>p</em> < .05 would. Nevertheless, since these levels are fixed in advance by convention, it does prevent people choosing their α level after looking at the data.
  </p>

  <p>
    Nevertheless, quite a lot of people still prefer to report <strong>exact p values</strong>. To many people, the advantage of allowing the reader to make up their own mind about how to interpret <em>p</em> = .06 outweighs any disadvantages. In practice, however, even among those researchers who prefer exact <em>p</em> values it is quite common to just write <em>p</em> < .001 instead of reporting an exact value for small <em>p</em>.
  </p>

  <p>
    This is in part because a lot of software doesn't actually print out the <em>p</em> value when it's that small (e.g., SPSS just writes <em>p</em> = .000 whenever <em>p</em> < .001), and in part because a very small <em>p</em> value can be kind of misleading. The human mind sees a number like .0000000001 and it's hard to suppress the gut feeling that the evidence in favour of the alternative hypothesis is a near certainty. In practice however, this is usually wrong. Life is a big, messy, complicated thing, and every statistical test ever invented relies on simplifications, approximations and assumptions.
  </p>

  <div class="important-callout">
    <h4>Interpretation of p < .001</h4>
    <p>
      As a consequence, it's probably not reasonable to walk away from any statistical analysis with a feeling of confidence stronger than <em>p</em> < .001 implies. In other words, <em>p</em> < .001 is really code for "as far as this test is concerned, the evidence is overwhelming."
    </p>
  </div>

  <h3>Best Practices</h3>

  <p>
    In light of all this, you might be wondering exactly what you should do. There's a fair bit of contradictory advice on the topic, with some people arguing that you should report the exact <em>p</em> value, and other people arguing that you should use the tiered approach. As a result, the best advice I can give is to suggest that you look at papers/reports written in your field and see what the convention seems to be. If there doesn't seem to be any consistent pattern, then use whichever method you prefer.
  </p>

  <div class="practice-tip">
    <h4>💡 Practical Tip</h4>
    <p>
      Regardless of how you choose to report your p values, remember that the p value is not the only important thing. You should also report:
    </p>
    <ul>
      <li>The test statistic value</li>
      <li>The degrees of freedom (if applicable)</li>
      <li>The effect size</li>
      <li>Descriptive statistics (means, standard deviations, etc.)</li>
      <li>Sample size</li>
    </ul>
  </div>
</section>
    `
  },
  {
    id: 'effect-size',
    moduleId: 'module-7',
    title: 'Effect Sizes',
    description: "Cohen's d, r, and practical significance.",
    icon: 'T',
    contentHtml: `
<section class="module-content">
  <h2>Effect Size, Sample Size and Power</h2>

  <blockquote class="chapter-quote">
    <p>Since all models are wrong the scientist must be alert to what is importantly wrong. It is inappropriate to be concerned with mice when there are tigers abroad.</p>
    <footer>– George Box</footer>
  </blockquote>

  <h3>9.8 Effect Size, Sample Size and Power</h3>

  <p>
    In previous sections I've emphasised the fact that the major design principle behind statistical hypothesis testing is that we try to control our Type I error rate. When we fix α = .05 we are attempting to ensure that only 5% of true null hypotheses are incorrectly rejected. However, this doesn't mean that we don't care about Type II errors. In fact, from the researcher's perspective, the error of failing to reject the null when it is actually false is an extremely annoying one.
  </p>

  <p>
    With that in mind, a secondary goal of hypothesis testing is to try to minimise β, the Type II error rate, although we don't usually talk in terms of minimising Type II errors. Instead, we talk about maximising the <strong>power</strong> of the test. Since power is defined as 1 − β, this is the same thing.
  </p>

  <h4>9.8.1 The Power Function</h4>

  <p>
    Let's take a moment to think about what a Type II error actually is. A Type II error occurs when the alternative hypothesis is true, but we are nevertheless unable to reject the null hypothesis. Ideally, we'd be able to calculate a single number β that tells us the Type II error rate, in the same way that we can set α = .05 for the Type I error rate. Unfortunately, this is a lot trickier to do.
  </p>

  <p>
    To see why, notice that in my ESP study the alternative hypothesis actually corresponds to lots of possible values of θ. In fact, the alternative hypothesis corresponds to every value of θ except 0.5. Let's suppose that the true probability of someone choosing the correct response is 55% (i.e., θ = .55). If so, then the true sampling distribution for <em>X</em> is not the same one that the null hypothesis predicts, as the most likely value for <em>X</em> is now 55 out of 100. Not only that, the whole sampling distribution has now shifted.
  </p>

  <p>
    The critical regions, of course, do not change. By definition the critical regions are based on what the null hypothesis predicts. What we're seeing is the fact that when the null hypothesis is wrong, a much larger proportion of the sampling distribution falls in the critical region. And of course that's what should happen. The probability of rejecting the null hypothesis is larger when the null hypothesis is actually false!
  </p>

  <p>
    However θ = .55 is not the only possibility consistent with the alternative hypothesis. Let's instead suppose that the true value of θ is actually 0.7. What happens to the sampling distribution when this occurs? Almost the entirety of the sampling distribution has now moved into the critical region. Therefore, if θ = 0.7, the probability of us correctly rejecting the null hypothesis (i.e., the power of the test) is much larger than if θ = 0.55.
  </p>

  <div class="important-callout">
    <h4>Key Insight</h4>
    <p>
      In short, while θ = .55 and θ = .70 are both part of the alternative hypothesis, <strong>the Type II error rate is different</strong>. What all this means is that the power of a test (i.e., 1 − β) depends on the true value of θ.
    </p>
  </div>

  <p>
    This plot describes what is usually called the <strong>power function</strong> of the test. It's a nice summary of how good the test is, because it actually tells you the power (1 − β) for all possible values of θ. As you can see, when the true value of θ is very close to 0.5, the power of the test drops very sharply, but when it is further away, the power is large.
  </p>

  <h4>9.8.2 Effect Size</h4>

  <p>
    The plot shown above captures a fairly basic point about hypothesis testing. If the true state of the world is very different from what the null hypothesis predicts then your power will be very high, but if the true state of the world is similar to the null (but not identical) then the power of the test is going to be very low. Therefore, it's useful to be able to have some way of quantifying how "similar" the true state of the world is to the null hypothesis. A statistic that does this is called a measure of <strong>effect size</strong>.
  </p>

  <div class="terminology-box">
    <h4>What is Effect Size?</h4>
    <p>
      Effect size is defined slightly differently in different contexts, but the qualitative idea that it tries to capture is always the same: <strong>How big is the difference between the true population parameters and the parameter values that are assumed by the null hypothesis?</strong>
    </p>
    <p>
      In our ESP example, if we let θ₀ = 0.5 denote the value assumed by the null hypothesis and let θ denote the true value, then a simple measure of effect size could be something like the difference between the true value and null (i.e., θ − θ₀), or possibly just the magnitude of this difference, |θ − θ₀|.
    </p>
  </div>

  <h4>Why Calculate Effect Size?</h4>

  <p>
    Let's assume that you've run your experiment, collected the data, and gotten a significant effect when you ran your hypothesis test. Isn't it enough just to say that you've gotten a significant effect? Surely that's the point of hypothesis testing?
  </p>

  <p>
    Well, sort of. Yes, the point of doing a hypothesis test is to try to demonstrate that the null hypothesis is wrong, but that's hardly the only thing we're interested in. If the null hypothesis claimed that θ = .5 and we show that it's wrong, we've only really told half of the story. Rejecting the null hypothesis implies that we believe that θ ≠ .5, but <strong>there's a big difference between θ = .51 and θ = .8</strong>.
  </p>

  <div class="analogy-box">
    <h4>The Practical Importance Question</h4>
    <p>
      If we find that θ = .8, then not only have we found that the null hypothesis is wrong, it appears to be very wrong. On the other hand, suppose we've successfully rejected the null hypothesis, but it looks like the true value of θ is only .51 (this would only be possible with a very large study). Sure, the null hypothesis is wrong but it's not at all clear that we actually care because <strong>the effect size is so small</strong>.
    </p>
    <p>
      In the context of my ESP study we might still care since any demonstration of real psychic powers would actually be pretty cool, but in other contexts a 1% difference usually isn't very interesting, even if it is a real difference.
    </p>
  </div>

  <p>
    For instance, suppose we're looking at differences in high school exam scores between males and females and it turns out that the female scores are 1% higher on average than the males. If I've got data from thousands of students then this difference will almost certainly be statistically significant, but regardless of how small the <em>p</em> value is it's just not very interesting. You'd hardly want to go around proclaiming a crisis in boys education on the basis of such a tiny difference would you?
  </p>

  <table class="statistics-table">
    <caption>A Crude Guide to Understanding Statistical Significance and Effect Sizes</caption>
    <thead>
      <tr>
        <th></th>
        <th>Big Effect Size</th>
        <th>Small Effect Size</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Significant result</strong></td>
        <td>Difference is real, and of practical importance</td>
        <td>Difference is real, but might not be interesting</td>
      </tr>
      <tr>
        <td><strong>Non-significant result</strong></td>
        <td>No effect observed</td>
        <td>No effect observed</td>
      </tr>
    </tbody>
  </table>

  <div class="warning-box">
    <h4>⚠️ Important Note</h4>
    <p>
      This table is a rough guide at best. It depends a lot on what exactly you're studying. <strong>Small effects can be of massive practical importance in some situations.</strong> So don't take this table too seriously.
    </p>
  </div>

  <p>
    It's for this reason that it is becoming more standard (slowly, but surely) to report some kind of standard measure of effect size along with the results of the hypothesis test. The hypothesis test itself tells you whether you should believe that the effect you have observed is real (i.e., not just due to chance), whereas <strong>the effect size tells you whether or not you should care</strong>.
  </p>

  <h4>9.8.3 Increasing the Power of Your Study</h4>

  <p>
    Not surprisingly, scientists are fairly obsessed with maximising the power of their experiments. We want our experiments to work and so we want to maximise the chance of rejecting the null hypothesis if it is false (and of course we usually want to believe that it is false!). As we've seen, one factor that influences power is the effect size. So the first thing you can do to increase your power is to <strong>increase the effect size</strong>.
  </p>

  <div class="practice-tip">
    <h4>Method 1: Clever Experimental Design</h4>
    <p>
      In practice, what this means is that you want to design your study in such a way that the effect size gets magnified. For instance, in my ESP study I might believe that psychic powers work best in a quiet, darkened room with fewer distractions to cloud the mind. Therefore I would try to conduct my experiments in just such an environment.
    </p>
    <p>
      If I can strengthen people's ESP abilities somehow then the true value of θ will go up and therefore my effect size will be larger. In short, <strong>clever experimental design is one way to boost power</strong>, because it can alter the effect size.
    </p>
  </div>

  <div class="practice-tip">
    <h4>Method 2: Increase Sample Size</h4>
    <p>
      Unfortunately, it's often the case that even with the best of experimental designs you may have only a small effect. Perhaps, for example, ESP really does exist but even under the best of conditions it's very very weak. Under those circumstances your best bet for increasing power is to <strong>increase the sample size</strong>.
    </p>
    <p>
      In general, the more observations that you have available, the more likely it is that you can discriminate between two hypotheses. If I ran my ESP experiment with 10 participants and 7 of them correctly guessed the colour of the hidden card you wouldn't be terribly impressed. But if I ran it with 10,000 participants, and 7,000 of them got the answer right, you would be much more likely to think I had discovered something.
    </p>
    <p>
      In other words, <strong>power increases with the sample size</strong>.
    </p>
  </div>

  <h3>Power Analysis</h3>

  <p>
    Because power is important, whenever you're contemplating running an experiment it would be pretty useful to know how much power you're likely to have. It's never possible to know for sure since you can't possibly know what your real effect size is. However, it's often (well, sometimes) possible to guess how big it should be. If so, you can guess what sample size you need! This idea is called <strong>power analysis</strong>, and if it's feasible to do it then it's very helpful.
  </p>

  <p>
    It can tell you something about whether you have enough time or money to be able to run the experiment successfully. It's increasingly common to see people arguing that power analysis should be a required part of experimental design, so it's worth knowing about.
  </p>

  <div class="critical-thinking-box">
    <h4>The Reality of Power Analysis</h4>
    <p>
      Speaking as a researcher, I have very rarely found myself in a position to be able to do one. It's either the case that:
    </p>
    <ul>
      <li>(a) my experiment is a bit non-standard and I don't know how to define effect size properly, or</li>
      <li>(b) I literally have so little idea about what the effect size will be that I wouldn't know how to interpret the answers.</li>
    </ul>
    <p>
      Not only that, after extensive conversations with people who do stats consulting for a living, I can't help but notice that in practice the only time anyone ever asks for a power analysis is when they're helping someone write a grant application. In other words, the only time any scientist ever seems to want a power analysis in real life is when they're being forced to do it by bureaucratic process.
    </p>
  </div>

  <h3>Summary</h3>

  <div class="summary-box">
    <h4>Key Takeaways</h4>
    <ul>
      <li><strong>Power (1 − β):</strong> The probability of correctly rejecting a false null hypothesis</li>
      <li><strong>Effect size:</strong> Quantifies how different the true state is from the null hypothesis</li>
      <li><strong>Relationship:</strong> Larger effect sizes and larger sample sizes both increase power</li>
      <li><strong>Practical significance:</strong> A statistically significant result with a small effect size might not be practically important</li>
      <li><strong>Reporting:</strong> Always report effect sizes along with p-values to give a complete picture</li>
    </ul>
  </div>
</section>
    `
  },

  // Module 8: Comparing Groups/Relationships
  {
    id: 'categorical-data-analysis',
    moduleId: 'module-8',
    title: 'Categorical Data Analysis',
    description: 'Chi-square tests, Fisher exact test, and McNemar test for categorical variables.',
    icon: 'χ²',
    contentHtml: `
<section class="module-content" aria-labelledby="categorical-title">
  <h2 id="categorical-title">10. Categorical Data Analysis</h2>

  <blockquote class="chapter-quote">
    <p>"Satan delights equally in statistics and in quoting scripture"</p>
    <footer>– H.G. Wells</footer>
  </blockquote>

  <p>
    Now that we've covered the basic theory behind hypothesis testing, it's time to start looking
    at specific tests that are commonly used in psychology. We'll start with <strong>χ² tests</strong>
    (pronounced "chi-square") and t-tests. Both of these tools are very frequently used in scientific
    practice, and whilst they're not as powerful as regression and analysis of variance, they're much
    easier to understand.
  </p>

  <p>
    The term <strong>"categorical data"</strong> is just another name for "nominal scale data". It's nothing that
    we haven't already discussed, it's just that in the context of data analysis people tend to use
    the term "categorical data" rather than "nominal scale data". Categorical data analysis refers
    to a collection of tools that you can use when your data are nominal scale.
  </p>

  <h3>10.1 The χ² (Chi-Square) Goodness-of-Fit Test</h3>

  <p>
    The χ² goodness-of-fit test is one of the oldest hypothesis tests around. It was invented by
    Karl Pearson around the turn of the century (Pearson 1900), with some corrections made later
    by Sir Ronald Fisher (Fisher 1922a). It tests whether an <strong>observed frequency distribution</strong> of a
    nominal variable matches an <strong>expected frequency distribution</strong>.
  </p>

  <div class="example-box">
    <h4>Example: The Cards Data</h4>
    <p>
      Suppose we asked 200 people to imagine a shuffled deck of cards and mentally pick one card "at random".
      We record the suit (hearts, clubs, spades, or diamonds) that people chose. Here's what we observed:
    </p>
    <table>
      <tr><th>Suit</th><th>clubs</th><th>diamonds</th><th>hearts</th><th>spades</th></tr>
      <tr><td>Count</td><td>35</td><td>51</td><td>64</td><td>50</td></tr>
    </table>
    <p>
      If people were truly choosing randomly, we'd expect each suit to be chosen 50 times (200 ÷ 4 = 50).
      The goodness-of-fit test helps us determine if the observed pattern differs significantly from this expectation.
    </p>
  </div>

  <h4>The Null and Alternative Hypotheses</h4>

  <p>
    For the cards example, our hypotheses are:
  </p>

  <ul>
    <li><strong>H₀:</strong> All four suits are chosen with equal probability (P = 0.25, 0.25, 0.25, 0.25)</li>
    <li><strong>H₁:</strong> At least one of the suit-choice probabilities isn't 0.25</li>
  </ul>

  <h4>The Test Statistic</h4>

  <p>
    The goodness-of-fit statistic compares observed frequencies (O<sub>i</sub>) with expected frequencies (E<sub>i</sub>):
  </p>

  <div class="formula-box">
    <p><strong>χ² = Σ [(O<sub>i</sub> - E<sub>i</sub>)² / E<sub>i</sub>]</strong></p>
    <p>where the sum is over all k categories</p>
  </div>

  <p>
    The expected frequency for each category is calculated as:
  </p>

  <div class="formula-box">
    <p><strong>E<sub>i</sub> = N × P<sub>i</sub></strong></p>
    <p>where N is the total sample size and P<sub>i</sub> is the expected probability for category i</p>
  </div>

  <h4>Degrees of Freedom</h4>

  <p>
    The degrees of freedom for the goodness-of-fit test is:
  </p>

  <div class="formula-box">
    <p><strong>df = k - 1</strong></p>
    <p>where k is the number of categories</p>
  </div>

  <p>
    This is because once you know the frequencies for k-1 categories and the total N,
    the frequency for the last category is determined.
  </p>

  <div class="key-points">
    <h4>Key Points: Goodness-of-Fit Test</h4>
    <ul>
      <li>Tests whether observed frequencies match expected frequencies</li>
      <li>Null hypothesis specifies the expected probabilities for each category</li>
      <li>Large χ² values suggest poor fit (reject H₀)</li>
      <li>Sampling distribution is χ² with df = k - 1</li>
      <li>Always a one-sided test (we only reject for large values)</li>
    </ul>
  </div>

  <h3>10.2 The χ² Test of Independence</h3>

  <p>
    The <strong>test of independence</strong> (also called the test of association) is used when you have
    two categorical variables and want to know if there's a relationship between them. This is analyzed
    using a <strong>contingency table</strong> (also called a cross-tabulation).
  </p>

  <div class="example-box">
    <h4>Example: Species and Choice</h4>
    <p>
      Suppose we ask robots and humans which of three things they prefer: puppies, flowers, or data files.
      Our research question is: Do robots and humans answer differently?
    </p>
    <table>
      <tr><th></th><th>Robot</th><th>Human</th><th>Total</th></tr>
      <tr><td>Puppy</td><td>13</td><td>15</td><td>28</td></tr>
      <tr><td>Flower</td><td>30</td><td>13</td><td>43</td></tr>
      <tr><td>Data</td><td>44</td><td>65</td><td>109</td></tr>
      <tr><td>Total</td><td>87</td><td>93</td><td>180</td></tr>
    </table>
  </div>

  <h4>The Null Hypothesis</h4>

  <p>
    For the test of independence:
  </p>

  <ul>
    <li><strong>H₀:</strong> The two variables are independent (no association)</li>
    <li><strong>H₁:</strong> The two variables are not independent (there is an association)</li>
  </ul>

  <h4>Expected Frequencies</h4>

  <p>
    For a contingency table, the expected frequency for cell (i,j) is:
  </p>

  <div class="formula-box">
    <p><strong>E<sub>ij</sub> = (R<sub>i</sub> × C<sub>j</sub>) / N</strong></p>
    <p>where R<sub>i</sub> is the row total, C<sub>j</sub> is the column total, and N is the grand total</p>
  </div>

  <h4>Test Statistic</h4>

  <p>
    The test statistic is calculated the same way as the goodness-of-fit test, but now we sum over all cells:
  </p>

  <div class="formula-box">
    <p><strong>χ² = ΣΣ [(O<sub>ij</sub> - E<sub>ij</sub>)² / E<sub>ij</sub>]</strong></p>
    <p>summing over all rows (i) and columns (j)</p>
  </div>

  <h4>Degrees of Freedom</h4>

  <p>
    For a contingency table with r rows and c columns:
  </p>

  <div class="formula-box">
    <p><strong>df = (r - 1)(c - 1)</strong></p>
  </div>

  <div class="key-points">
    <h4>Key Points: Test of Independence</h4>
    <ul>
      <li>Tests whether two categorical variables are associated</li>
      <li>Uses a contingency table (cross-tabulation)</li>
      <li>Expected frequencies calculated from marginal totals</li>
      <li>df = (rows - 1) × (columns - 1)</li>
      <li>Also a one-sided test</li>
    </ul>
  </div>

  <h3>10.3 The Continuity Correction (Yates Correction)</h3>

  <p>
    When you have only <strong>1 degree of freedom</strong> (e.g., a 2×2 contingency table), the χ² approximation
    can be improved by applying the <strong>continuity correction</strong>. This adjustment, suggested by Yates (1934),
    subtracts 0.5 from the absolute difference before squaring:
  </p>

  <div class="formula-box">
    <p><strong>χ² = Σ [(|E<sub>i</sub> - O<sub>i</sub>| - 0.5)² / E<sub>i</sub>]</strong></p>
  </div>

  <p>
    This correction tends to make the test more conservative (less likely to reject H₀). It's especially
    important when sample sizes are small and df = 1.
  </p>

  <h3>10.4 Effect Size</h3>

  <p>
    When you get a significant χ² result, you should report an <strong>effect size</strong> to indicate how strong
    the association is. Two common measures are:
  </p>

  <h4>Phi (φ) Statistic</h4>

  <div class="formula-box">
    <p><strong>φ = √(χ² / N)</strong></p>
  </div>

  <p>
    The φ statistic works well for 2×2 tables, where it ranges from 0 to 1. However, for larger tables
    it can exceed 1, which is problematic.
  </p>

  <h4>Cramér's V</h4>

  <div class="formula-box">
    <p><strong>V = √[χ² / (N × (k - 1))]</strong></p>
    <p>where k = min(r, c) is the smaller of the number of rows or columns</p>
  </div>

  <p>
    Cramér's V always ranges from 0 (no association) to 1 (perfect association), making it the preferred
    measure for larger contingency tables.
  </p>

  <div class="interpretation-guide">
    <h4>Interpreting Cramér's V</h4>
    <ul>
      <li><strong>V = 0:</strong> No association at all</li>
      <li><strong>V = 0.1:</strong> Small effect</li>
      <li><strong>V = 0.3:</strong> Medium effect</li>
      <li><strong>V = 0.5+:</strong> Large effect</li>
    </ul>
  </div>

  <h3>10.5 Assumptions of the χ² Test</h3>

  <p>
    Like all statistical tests, the χ² test makes assumptions. Violating these assumptions can lead to
    incorrect conclusions:
  </p>

  <div class="assumptions-box">
    <h4>Assumptions</h4>
    <ol>
      <li>
        <strong>Expected frequencies are sufficiently large:</strong> A common rule of thumb is that all
        expected frequencies should be at least 5. For larger tables, it's okay if at least 80% of expected
        frequencies are above 5 and none are below 1.
      </li>
      <li>
        <strong>Data are independent:</strong> Each observation should be independent of all others. The
        same participant cannot appear in multiple cells of the contingency table (unless you're using
        the McNemar test for paired data).
      </li>
    </ol>
  </div>

  <h3>10.6 The Fisher Exact Test</h3>

  <p>
    When <strong>expected cell counts are too small</strong> for the χ² test, use the <strong>Fisher exact test</strong>.
    This test calculates the exact probability of observing the data (or more extreme data) under the null hypothesis,
    without relying on the χ² approximation.
  </p>

  <p>
    The Fisher exact test works by treating the row and column totals as fixed, then calculating the probability
    of each possible table using the <strong>hypergeometric distribution</strong>. It's most commonly used for 2×2 tables
    with small samples.
  </p>

  <div class="key-points">
    <h4>When to Use Fisher Exact Test</h4>
    <ul>
      <li>Expected cell counts are too small (< 5)</li>
      <li>Sample size is small overall</li>
      <li>You want an exact p-value rather than an approximation</li>
      <li>Most commonly used for 2×2 tables</li>
    </ul>
  </div>

  <h3>10.7 The McNemar Test</h3>

  <p>
    The <strong>McNemar test</strong> is used when you have <strong>paired categorical data</strong> – that is,
    when the same participants are measured twice (repeated measures) or when observations are matched in pairs.
    This violates the independence assumption of the standard χ² test.
  </p>

  <div class="example-box">
    <h4>Example: Political Advertising</h4>
    <p>
      You ask 100 people if they'll vote for a political party, show them an advertisement, then ask again.
      Since each person provides two responses, the observations aren't independent.
    </p>
    <table>
      <tr><th></th><th>After: Yes</th><th>After: No</th><th>Total</th></tr>
      <tr><td>Before: Yes</td><td>5</td><td>25</td><td>30</td></tr>
      <tr><td>Before: No</td><td>5</td><td>65</td><td>70</td></tr>
      <tr><td>Total</td><td>10</td><td>90</td><td>100</td></tr>
    </table>
  </div>

  <h4>The Null Hypothesis</h4>

  <p>
    The McNemar test tests for <strong>marginal homogeneity</strong>:
  </p>

  <ul>
    <li><strong>H₀:</strong> The marginal probabilities are equal (P<sub>row</sub> = P<sub>column</sub>)</li>
    <li><strong>H₁:</strong> The marginal probabilities are not equal</li>
  </ul>

  <h4>Test Statistic</h4>

  <p>
    For a 2×2 table with cells labeled:
  </p>

  <table>
    <tr><th></th><th>After: Yes</th><th>After: No</th></tr>
    <tr><td>Before: Yes</td><td>a</td><td>b</td></tr>
    <tr><td>Before: No</td><td>c</td><td>d</td></tr>
  </table>

  <p>
    The McNemar test statistic (with continuity correction) is:
  </p>

  <div class="formula-box">
    <p><strong>χ² = (|b - c| - 0.5)² / (b + c)</strong></p>
    <p>with df = 1</p>
  </div>

  <p>
    Notice that only the <strong>off-diagonal cells</strong> (b and c) matter – these represent people who changed
    their response. The diagonal cells (a and d) represent people who didn't change.
  </p>

  <div class="critical-thinking-box">
    <h4>McNemar vs. Independence Test</h4>
    <p>
      <strong>Use McNemar when:</strong> Same participants measured twice, or paired observations
    </p>
    <p>
      <strong>Use χ² independence when:</strong> Different participants in each cell, observations are independent
    </p>
    <p>
      Using the wrong test can lead to incorrect conclusions! Always check whether observations are independent.
    </p>
  </div>

  <h3>10.8 Doing Chi-Square Tests in jamovi</h3>

  <h4>Goodness-of-Fit Test</h4>
  <p>
    In jamovi: <strong>Analyses → Frequencies → One Sample Proportion Tests → N Outcomes</strong>
  </p>
  <ul>
    <li>Move your variable to the 'Variable' box</li>
    <li>Check 'Expected counts' to see expected frequencies</li>
    <li>Use 'Expected Proportions' to specify custom null hypothesis proportions</li>
  </ul>

  <h4>Test of Independence</h4>
  <p>
    In jamovi: <strong>Analyses → Frequencies → Contingency Tables → Independent Samples</strong>
  </p>
  <ul>
    <li>Move one variable to 'Rows' and one to 'Columns'</li>
    <li>Check 'Expected counts' under 'Cells'</li>
    <li>Check 'χ² continuity correction' for 2×2 tables</li>
    <li>Check 'Fisher's exact test' if expected counts are small</li>
    <li>Check 'Cramér's V' under 'Statistics' for effect size</li>
  </ul>

  <h4>McNemar Test</h4>
  <p>
    In jamovi: <strong>Analyses → Frequencies → Contingency Tables → Paired Samples</strong>
  </p>
  <ul>
    <li>Move first measurement to 'Rows'</li>
    <li>Move second measurement to 'Columns'</li>
    <li>Check 'χ² continuity correction'</li>
  </ul>

  <h3>10.9 Reporting Results</h3>

  <p>
    When reporting χ² test results, include:
  </p>

  <div class="reporting-guide">
    <h4>Essential Elements</h4>
    <ol>
      <li><strong>Descriptive statistics:</strong> Describe the observed frequencies or percentages</li>
      <li><strong>The null hypothesis:</strong> Briefly state what you're testing</li>
      <li><strong>Test statistic:</strong> Report χ²(df) = value, p = value</li>
      <li><strong>Effect size:</strong> Report Cramér's V or φ</li>
      <li><strong>Interpretation:</strong> Explain what the result means in plain language</li>
    </ol>
  </div>

  <div class="example-box">
    <h4>Example Write-Up</h4>
    <p>
      "Of the 200 participants in the experiment, 64 selected hearts for their first choice, 51 selected
      diamonds, 50 selected spades, and 35 selected clubs. A chi-square goodness-of-fit test was conducted
      to test whether the choice probabilities were identical for all four suits. The results were significant
      (χ²(3) = 8.44, p < .05), suggesting that people did not select suits purely at random."
    </p>
  </div>

  <h3>Summary</h3>

  <div class="summary-box">
    <h4>Key Takeaways</h4>
    <ul>
      <li><strong>Goodness-of-fit test:</strong> Tests if observed frequencies match expected probabilities (df = k - 1)</li>
      <li><strong>Test of independence:</strong> Tests if two categorical variables are associated (df = (r-1)(c-1))</li>
      <li><strong>Continuity correction:</strong> Apply when df = 1 for better approximation</li>
      <li><strong>Effect size:</strong> Use Cramér's V to quantify strength of association (0 to 1)</li>
      <li><strong>Assumptions:</strong> Expected frequencies ≥ 5, observations independent</li>
      <li><strong>Fisher exact test:</strong> Use when expected frequencies are too small</li>
      <li><strong>McNemar test:</strong> Use for paired/repeated measures categorical data</li>
      <li><strong>Always report:</strong> Descriptive stats, test statistic with df, p-value, effect size, and interpretation</li>
    </ul>
  </div>

  <div class="practice-tip">
    <h4>Common Pitfalls to Avoid</h4>
    <ul>
      <li>❌ Using χ² test when expected frequencies are too small → Use Fisher exact test</li>
      <li>❌ Using independence test for paired data → Use McNemar test</li>
      <li>❌ Reporting only p-value without effect size → Always include Cramér's V</li>
      <li>❌ Forgetting to check assumptions → Always verify expected frequencies and independence</li>
      <li>❌ Misinterpreting significance → Significant doesn't always mean practically important</li>
    </ul>
  </div>
</section>
    `
  },
  {
    id: 'correlation',
    moduleId: 'module-8',
    chapter: 'chapter-12',
    title: 'Correlation',
    description: 'Pearson and Spearman correlation coefficients, measuring strength and direction of relationships.',
    icon: 'r',
    contentHtml: `
<section class="topic-content">
  <h2>Correlation</h2>

  <div class="concept-box">
    <h3>What is Correlation?</h3>
    <p>Correlation measures the <strong>strength and direction</strong> of the relationship between two continuous variables. It tells us whether variables tend to increase together (positive correlation), decrease together (negative correlation), or show no systematic pattern (no correlation).</p>
  </div>

  <div class="concept-box">
    <h3>Pearson Correlation Coefficient (r)</h3>
    <p>The most common measure of correlation is the <strong>Pearson correlation coefficient (r)</strong>, which ranges from -1 to +1:</p>
    <ul>
      <li><strong>r = +1:</strong> Perfect positive relationship (as X increases, Y increases proportionally)</li>
      <li><strong>r = -1:</strong> Perfect negative relationship (as X increases, Y decreases proportionally)</li>
      <li><strong>r = 0:</strong> No linear relationship</li>
    </ul>

    <h4>Formula</h4>
    <div class="formula">
      <p><strong>Covariance:</strong> Cov(X,Y) = (1/(N-1)) Σ(X<sub>i</sub> - X̄)(Y<sub>i</sub> - Ȳ)</p>
      <p><strong>Pearson correlation:</strong> r<sub>XY</sub> = Cov(X,Y) / (σ̂<sub>X</sub> × σ̂<sub>Y</sub>)</p>
    </div>

    <h4>Interpretation Guidelines</h4>
    <table>
      <tr><th>Correlation Value</th><th>Interpretation</th></tr>
      <tr><td>±0.9 to ±1.0</td><td>Very strong</td></tr>
      <tr><td>±0.7 to ±0.9</td><td>Strong</td></tr>
      <tr><td>±0.4 to ±0.7</td><td>Moderate</td></tr>
      <tr><td>±0.2 to ±0.4</td><td>Weak</td></tr>
      <tr><td>0 to ±0.2</td><td>Negligible</td></tr>
    </table>
  </div>

  <div class="concept-box">
    <h3>Spearman's Rank Correlation (ρ)</h3>
    <p><strong>Spearman's rho (ρ)</strong> is used when:</p>
    <ul>
      <li>The relationship is <strong>monotonic but not linear</strong></li>
      <li>Data are <strong>ordinal</strong> (ranked)</li>
      <li>There are <strong>outliers</strong> affecting Pearson's r</li>
    </ul>
    <p>Instead of using raw values, Spearman's correlation uses the <strong>ranks</strong> of the data. It's less sensitive to extreme values and works well for non-linear monotonic relationships.</p>
  </div>

  <div class="jamovi-box">
    <h3>Computing Correlations in jamovi</h3>
    <ol>
      <li>Go to <strong>Analyses → Regression → Correlation Matrix</strong></li>
      <li>Select the variables you want to correlate</li>
      <li>Under correlation type:
        <ul>
          <li>Check <strong>Pearson</strong> for linear relationships</li>
          <li>Check <strong>Spearman</strong> for monotonic relationships or ordinal data</li>
        </ul>
      </li>
      <li>Check <strong>Report significance</strong> to get p-values</li>
      <li>Check <strong>Flag significant correlations</strong> to highlight significant results</li>
    </ol>
  </div>

  <div class="video-box">
    <div class="video-title">📺 Video Tutorial: Running Correlation in Jamovi</div>
    <div class="video-wrapper">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
        title="How to Run Correlation in Jamovi"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-muted);">
      Note: This is a placeholder YouTube video. Replace with your actual tutorial video ID.
    </p>
  </div>

  <div class="key-points">
    <h3>Key Points</h3>
    <ul>
      <li>Correlation measures <strong>association, not causation</strong></li>
      <li>Always create a <strong>scatterplot</strong> before computing correlation</li>
      <li>Pearson's r assumes a <strong>linear relationship</strong></li>
      <li>Outliers can strongly influence Pearson's r</li>
      <li>Use Spearman's ρ for non-linear monotonic relationships</li>
      <li>Statistical significance doesn't imply practical importance</li>
    </ul>
  </div>

  <div class="example-box">
    <h3>Example Interpretation</h3>
    <p><strong>Research Question:</strong> Is there a relationship between study hours and exam scores?</p>
    <p><strong>Result:</strong> r = 0.68, p < .001</p>
    <p><strong>Interpretation:</strong> There is a <strong>moderate to strong positive correlation</strong> between study hours and exam scores (r = .68). This correlation is statistically significant (p < .001), suggesting that students who study more hours tend to score higher on exams. However, correlation does not imply that studying more <em>causes</em> higher scores—other factors may be involved.</p>
  </div>

  <div class="warning-box">
    <h3>Common Pitfalls</h3>
    <ul>
      <li><strong>Confusing correlation with causation:</strong> Just because two variables are correlated doesn't mean one causes the other</li>
      <li><strong>Ignoring non-linear relationships:</strong> Pearson's r can be near zero even when there's a strong curved relationship</li>
      <li><strong>Not checking for outliers:</strong> One extreme value can dramatically change the correlation</li>
      <li><strong>Restricted range:</strong> Correlations can be weaker when the range of values is limited</li>
    </ul>
  </div>
</section>
    `
  },
  {
    id: 'scatterplots',
    moduleId: 'module-8',
    chapter: 'chapter-12',
    title: 'Scatterplots',
    description: 'Visualizing relationships between continuous variables.',
    icon: '📊',
    contentHtml: `
<section class="topic-content">
  <h2>Scatterplots</h2>

  <div class="concept-box">
    <h3>What is a Scatterplot?</h3>
    <p>A <strong>scatterplot</strong> is a graph that displays the relationship between two continuous variables. Each observation is represented as a single point, where:</p>
    <ul>
      <li>The <strong>horizontal position (x-axis)</strong> represents the value on one variable</li>
      <li>The <strong>vertical position (y-axis)</strong> represents the value on the other variable</li>
    </ul>
    <p>Scatterplots are essential for visualizing patterns, trends, and potential outliers in bivariate data.</p>
  </div>

  <div class="concept-box">
    <h3>Conventions and Best Practices</h3>
    <ul>
      <li><strong>Predictor (X) on horizontal axis:</strong> If one variable is thought to predict or cause the other, place the predictor on the x-axis</li>
      <li><strong>Outcome (Y) on vertical axis:</strong> The response or outcome variable goes on the y-axis</li>
      <li><strong>Label axes clearly:</strong> Include variable names and units of measurement</li>
      <li><strong>Choose appropriate scales:</strong> Ensure the full range of data is visible</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>What to Look For in Scatterplots</h3>

    <h4>1. Direction of Relationship</h4>
    <ul>
      <li><strong>Positive:</strong> Points slope upward from left to right (as X increases, Y increases)</li>
      <li><strong>Negative:</strong> Points slope downward from left to right (as X increases, Y decreases)</li>
      <li><strong>No relationship:</strong> Points show no clear pattern</li>
    </ul>

    <h4>2. Form of Relationship</h4>
    <ul>
      <li><strong>Linear:</strong> Points follow a straight-line pattern</li>
      <li><strong>Curved:</strong> Points follow a curved pattern (quadratic, exponential, etc.)</li>
      <li><strong>No pattern:</strong> Points are scattered randomly</li>
    </ul>

    <h4>3. Strength of Relationship</h4>
    <ul>
      <li><strong>Strong:</strong> Points cluster tightly around a line or curve</li>
      <li><strong>Moderate:</strong> Points show a pattern but with more scatter</li>
      <li><strong>Weak:</strong> Points show a vague pattern with lots of scatter</li>
    </ul>

    <h4>4. Outliers</h4>
    <ul>
      <li>Look for points that don't follow the general pattern</li>
      <li>Outliers can strongly influence correlation and regression results</li>
      <li>Investigate outliers to determine if they're errors or genuine observations</li>
    </ul>
  </div>

  <div class="jamovi-box">
    <h3>Creating Scatterplots in jamovi</h3>

    <h4>Method 1: Using Descriptives</h4>
    <ol>
      <li>Go to <strong>Analyses → Exploration → Descriptives</strong></li>
      <li>Move your variables to the <strong>Variables</strong> box</li>
      <li>Expand <strong>Plots</strong></li>
      <li>Check <strong>Correlation matrix</strong> (this creates scatterplots with correlation values)</li>
    </ol>

    <h4>Method 2: Using Scatterplot Tool</h4>
    <ol>
      <li>Go to <strong>Analyses → Exploration → Scatterplot</strong></li>
      <li>Select the <strong>X-Axis</strong> variable (predictor)</li>
      <li>Select the <strong>Y-Axis</strong> variable (outcome)</li>
      <li>Optional: Add a <strong>Group</strong> variable to color points by category</li>
      <li>Check <strong>Fit line</strong> to add a regression line</li>
      <li>Check <strong>SE</strong> to show confidence bands around the line</li>
    </ol>
  </div>

  <div class="key-points">
    <h3>Key Points</h3>
    <ul>
      <li><strong>Always plot your data first</strong> before computing correlations or running regressions</li>
      <li>Scatterplots reveal patterns that summary statistics might miss</li>
      <li>Look for non-linear relationships that correlation might not capture</li>
      <li>Identify outliers that could influence your analysis</li>
      <li>Check for heteroscedasticity (unequal variance across X values)</li>
      <li>Consider adding a regression line to visualize the trend</li>
    </ul>
  </div>

  <div class="example-box">
    <h3>Example Interpretation</h3>
    <p><strong>Scenario:</strong> Examining the relationship between hours of sleep and reaction time</p>
    <p><strong>Scatterplot shows:</strong></p>
    <ul>
      <li><strong>Direction:</strong> Negative (points slope downward)</li>
      <li><strong>Form:</strong> Approximately linear</li>
      <li><strong>Strength:</strong> Moderate (some scatter but clear trend)</li>
      <li><strong>Outliers:</strong> One person with very low sleep but fast reaction time</li>
    </ul>
    <p><strong>Interpretation:</strong> The scatterplot suggests that people who get more sleep tend to have faster (lower) reaction times. The relationship appears roughly linear and moderately strong. However, there's one outlier who had very little sleep but still performed well, which might warrant investigation.</p>
  </div>

  <div class="warning-box">
    <h3>Common Pitfalls</h3>
    <ul>
      <li><strong>Skipping the scatterplot:</strong> Never rely solely on correlation coefficients without visualizing the data</li>
      <li><strong>Forcing linear interpretation:</strong> Don't assume relationships are linear—let the data show you the form</li>
      <li><strong>Ignoring outliers:</strong> Outliers can dramatically affect statistical analyses</li>
      <li><strong>Wrong axis placement:</strong> Mixing up predictor and outcome can cause confusion in interpretation</li>
    </ul>
  </div>
</section>
    `
  },
  {
    id: 'simple-regression',
    moduleId: 'module-8',
    chapter: 'chapter-12',
    title: 'Simple Linear Regression',
    description: 'Predicting outcomes with one predictor variable.',
    icon: 'ŷ',
    contentHtml: `
<section class="topic-content">
  <h2>Simple Linear Regression</h2>

  <div class="concept-box">
    <h3>What is Simple Linear Regression?</h3>
    <p><strong>Simple linear regression</strong> models the relationship between one predictor variable (X) and one outcome variable (Y) using a straight line. Unlike correlation, which only measures association, regression allows us to:</p>
    <ul>
      <li><strong>Predict</strong> values of Y from X</li>
      <li><strong>Quantify</strong> how much Y changes when X changes by one unit</li>
      <li><strong>Test hypotheses</strong> about the relationship</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>The Regression Model</h3>

    <h4>Basic Equation</h4>
    <div class="formula">
      <p><strong>Ŷ<sub>i</sub> = b<sub>0</sub> + b<sub>1</sub>X<sub>i</sub></strong></p>
    </div>
    <p>Where:</p>
    <ul>
      <li><strong>Ŷ<sub>i</sub></strong> = predicted value of Y for observation i</li>
      <li><strong>b<sub>0</sub></strong> = intercept (predicted Y when X = 0)</li>
      <li><strong>b<sub>1</sub></strong> = slope (change in Y for a 1-unit increase in X)</li>
      <li><strong>X<sub>i</sub></strong> = value of X for observation i</li>
    </ul>

    <h4>Complete Model with Error</h4>
    <div class="formula">
      <p><strong>Y<sub>i</sub> = b<sub>0</sub> + b<sub>1</sub>X<sub>i</sub> + ε<sub>i</sub></strong></p>
    </div>
    <p>Where:</p>
    <ul>
      <li><strong>Y<sub>i</sub></strong> = actual observed value</li>
      <li><strong>ε<sub>i</sub></strong> = residual (error) = Y<sub>i</sub> - Ŷ<sub>i</sub></li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>Ordinary Least Squares (OLS)</h3>
    <p>The regression line is estimated using <strong>Ordinary Least Squares (OLS)</strong>, which finds the values of b<sub>0</sub> and b<sub>1</sub> that <strong>minimize the sum of squared residuals</strong>:</p>
    <div class="formula">
      <p>Minimize: Σε<sub>i</sub>² = Σ(Y<sub>i</sub> - Ŷ<sub>i</sub>)²</p>
    </div>
    <p>This gives us the "best-fitting" line in the sense that it minimizes the total squared distance between observed and predicted values.</p>
  </div>

  <div class="concept-box">
    <h3>Interpreting Coefficients</h3>

    <h4>The Intercept (b<sub>0</sub>)</h4>
    <ul>
      <li>The <strong>predicted value of Y when X = 0</strong></li>
      <li>May not be meaningful if X = 0 is outside the range of the data</li>
      <li>Example: "When study hours = 0, the predicted exam score is 45"</li>
    </ul>

    <h4>The Slope (b<sub>1</sub>)</h4>
    <ul>
      <li>The <strong>change in Y for a 1-unit increase in X</strong></li>
      <li>The most important coefficient for interpretation</li>
      <li>Positive slope: Y increases as X increases</li>
      <li>Negative slope: Y decreases as X increases</li>
      <li>Example: "For each additional hour of study, exam scores increase by 3.2 points"</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>R² (Coefficient of Determination)</h3>
    <div class="formula">
      <p><strong>R² = 1 - (SS<sub>residual</sub> / SS<sub>total</sub>)</strong></p>
    </div>
    <ul>
      <li>Represents the <strong>proportion of variance in Y explained by X</strong></li>
      <li>Ranges from 0 to 1 (often reported as percentage)</li>
      <li>R² = 0.64 means "64% of the variance in Y is explained by X"</li>
      <li>For simple regression: <strong>r² = R²</strong> (squared correlation)</li>
      <li>Higher R² indicates better model fit, but doesn't guarantee causation</li>
    </ul>
  </div>

  <div class="jamovi-box">
    <h3>Running Simple Regression in jamovi</h3>
    <ol>
      <li>Go to <strong>Analyses → Regression → Linear Regression</strong></li>
      <li>Move your outcome variable to <strong>Dependent Variable</strong></li>
      <li>Move your predictor to <strong>Covariates</strong></li>
      <li>Under <strong>Model Fit</strong>, check:
        <ul>
          <li><strong>R</strong> (correlation)</li>
          <li><strong>R²</strong> (proportion of variance explained)</li>
          <li><strong>Adjusted R²</strong></li>
        </ul>
      </li>
      <li>Under <strong>Model Coefficients</strong>, check:
        <ul>
          <li><strong>Estimate</strong> (the b values)</li>
          <li><strong>Confidence interval</strong> (usually 95%)</li>
        </ul>
      </li>
      <li>Under <strong>Assumption Checks</strong>, check:
        <ul>
          <li><strong>Q-Q plot of residuals</strong></li>
          <li><strong>Residual plots</strong></li>
        </ul>
      </li>
    </ol>
  </div>

  <div class="key-points">
    <h3>Key Points</h3>
    <ul>
      <li>Always create a <strong>scatterplot first</strong> to check if a linear model is appropriate</li>
      <li>The slope tells you the <strong>rate of change</strong> in Y per unit change in X</li>
      <li>R² tells you how much variance is explained, not whether the relationship is causal</li>
      <li>Check assumptions (normality, linearity, homoscedasticity) before trusting results</li>
      <li>Be cautious about <strong>extrapolation</strong> beyond the range of your data</li>
    </ul>
  </div>

  <div class="example-box">
    <h3>Example Interpretation</h3>
    <p><strong>Research Question:</strong> Can we predict exam scores from study hours?</p>
    <p><strong>Results:</strong></p>
    <ul>
      <li>Ŷ = 42.5 + 3.2X</li>
      <li>R² = 0.46</li>
      <li>b<sub>1</sub> = 3.2, SE = 0.8, t = 4.0, p < .001</li>
    </ul>
    <p><strong>Interpretation:</strong></p>
    <ul>
      <li>The regression equation is: <strong>Predicted Exam Score = 42.5 + 3.2(Study Hours)</strong></li>
      <li>For each additional hour of study, exam scores increase by an average of <strong>3.2 points</strong></li>
      <li>Study hours explain <strong>46% of the variance</strong> in exam scores (R² = .46)</li>
      <li>The relationship is statistically significant (p < .001)</li>
      <li>A student who studies 10 hours is predicted to score: 42.5 + 3.2(10) = <strong>74.5 points</strong></li>
    </ul>
  </div>

  <div class="warning-box">
    <h3>Common Pitfalls</h3>
    <ul>
      <li><strong>Assuming causation:</strong> Regression shows prediction, not necessarily causation</li>
      <li><strong>Extrapolating:</strong> Don't predict Y for X values outside your data range</li>
      <li><strong>Ignoring assumptions:</strong> Results can be misleading if assumptions are violated</li>
      <li><strong>Over-interpreting R²:</strong> Low R² doesn't mean the relationship isn't important</li>
      <li><strong>Confusing b and β:</strong> b is unstandardized, β is standardized (see Multiple Regression)</li>
    </ul>
  </div>
</section>
    `
  },
  {
    id: 'multiple-regression',
    moduleId: 'module-8',
    chapter: 'chapter-12',
    title: 'Multiple Regression',
    description: 'Regression models with multiple predictors, standardized coefficients.',
    icon: 'Ŷ',
    contentHtml: `
<section class="topic-content">
  <h2>Multiple Linear Regression</h2>

  <div class="concept-box">
    <h3>What is Multiple Regression?</h3>
    <p><strong>Multiple linear regression</strong> extends simple regression to include <strong>multiple predictor variables</strong>. This allows us to:</p>
    <ul>
      <li>Examine the <strong>unique effect</strong> of each predictor while controlling for others</li>
      <li>Make more <strong>accurate predictions</strong> by using multiple sources of information</li>
      <li>Understand <strong>complex relationships</strong> between variables</li>
      <li>Control for <strong>confounding variables</strong></li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>The Multiple Regression Model</h3>
    <div class="formula">
      <p><strong>Y<sub>i</sub> = b<sub>0</sub> + b<sub>1</sub>X<sub>i1</sub> + b<sub>2</sub>X<sub>i2</sub> + ... + b<sub>K</sub>X<sub>iK</sub> + ε<sub>i</sub></strong></p>
    </div>
    <p>Where:</p>
    <ul>
      <li><strong>Y<sub>i</sub></strong> = outcome variable for observation i</li>
      <li><strong>b<sub>0</sub></strong> = intercept (predicted Y when all X = 0)</li>
      <li><strong>b<sub>1</sub>, b<sub>2</sub>, ..., b<sub>K</sub></strong> = regression coefficients for K predictors</li>
      <li><strong>X<sub>i1</sub>, X<sub>i2</sub>, ..., X<sub>iK</sub></strong> = predictor values for observation i</li>
      <li><strong>ε<sub>i</sub></strong> = residual (error term)</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>Interpreting Coefficients in Multiple Regression</h3>

    <h4>Unstandardized Coefficients (b)</h4>
    <p>Each coefficient represents the <strong>change in Y for a 1-unit increase in that predictor, holding all other predictors constant</strong>.</p>
    <ul>
      <li>Interpretation: "Controlling for other variables, a 1-unit increase in X<sub>k</sub> is associated with a b<sub>k</sub>-unit change in Y"</li>
      <li>Useful when predictors are on <strong>meaningful scales</strong></li>
      <li>Example: "Controlling for age, each additional hour of study increases exam scores by 2.5 points"</li>
    </ul>

    <h4>Standardized Coefficients (β)</h4>
    <div class="formula">
      <p><strong>β<sub>k</sub> = b<sub>k</sub> × (σ<sub>X<sub>k</sub></sub> / σ<sub>Y</sub>)</strong></p>
    </div>
    <p>Standardized coefficients express effects in <strong>standard deviation units</strong>, allowing direct comparison of predictor importance:</p>
    <ul>
      <li>Interpretation: "A 1 SD increase in X<sub>k</sub> is associated with a β<sub>k</sub> SD change in Y"</li>
      <li>Useful for <strong>comparing relative importance</strong> of predictors on different scales</li>
      <li>The predictor with the largest |β| has the strongest relative effect</li>
      <li>Example: "A 1 SD increase in study hours (β = .52) has a stronger effect than a 1 SD increase in IQ (β = .38)"</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>R² and Adjusted R²</h3>

    <h4>R² (Multiple Correlation Squared)</h4>
    <ul>
      <li>Proportion of variance in Y explained by <strong>all predictors together</strong></li>
      <li>Always increases when adding predictors (even if they're not useful)</li>
      <li>Can be inflated in small samples</li>
    </ul>

    <h4>Adjusted R²</h4>
    <div class="formula">
      <p><strong>Adj. R² = 1 - (SS<sub>res</sub>/SS<sub>tot</sub>) × ((N-1)/(N-K-1))</strong></p>
    </div>
    <ul>
      <li>Adjusts for the <strong>number of predictors</strong> in the model</li>
      <li>Penalizes adding predictors that don't improve fit enough</li>
      <li>Use when <strong>comparing models</strong> with different numbers of predictors</li>
      <li>Can decrease when adding unhelpful predictors</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>Multicollinearity</h3>
    <p><strong>Multicollinearity</strong> occurs when predictors are highly correlated with each other. This causes problems:</p>
    <ul>
      <li>Coefficients become <strong>unstable</strong> (large standard errors)</li>
      <li>Difficult to determine the <strong>unique effect</strong> of each predictor</li>
      <li>Coefficients may have <strong>unexpected signs</strong></li>
    </ul>

    <h4>Detecting Multicollinearity: VIF</h4>
    <div class="formula">
      <p><strong>VIF<sub>k</sub> = 1 / (1 - R²<sub>k</sub>)</strong></p>
    </div>
    <p>Where R²<sub>k</sub> is from regressing X<sub>k</sub> on all other predictors</p>
    <ul>
      <li><strong>VIF < 5:</strong> Generally acceptable</li>
      <li><strong>VIF 5-10:</strong> Moderate multicollinearity (concerning)</li>
      <li><strong>VIF > 10:</strong> Severe multicollinearity (problematic)</li>
      <li>√VIF shows how much wider the confidence interval is due to collinearity</li>
    </ul>

    <h4>Dealing with Multicollinearity</h4>
    <ul>
      <li>Remove one of the highly correlated predictors</li>
      <li>Combine correlated predictors into a single composite measure</li>
      <li>Use dimension reduction techniques (factor analysis, PCA)</li>
      <li>Collect more data (if possible)</li>
    </ul>
  </div>

  <div class="jamovi-box">
    <h3>Running Multiple Regression in jamovi</h3>
    <ol>
      <li>Go to <strong>Analyses → Regression → Linear Regression</strong></li>
      <li>Move your outcome to <strong>Dependent Variable</strong></li>
      <li>Move all predictors to <strong>Covariates</strong></li>
      <li>Under <strong>Model Fit</strong>:
        <ul>
          <li>Check <strong>R²</strong> and <strong>Adjusted R²</strong></li>
        </ul>
      </li>
      <li>Under <strong>Model Coefficients</strong>:
        <ul>
          <li>Check <strong>Standardized estimate</strong> to see β values</li>
          <li>Check <strong>Confidence interval</strong></li>
        </ul>
      </li>
      <li>Under <strong>Assumption Checks</strong>:
        <ul>
          <li>Check <strong>Collinearity statistics</strong> to see VIF values</li>
        </ul>
      </li>
    </ol>
  </div>

  <div class="key-points">
    <h3>Key Points</h3>
    <ul>
      <li>Each coefficient represents the <strong>unique effect holding other predictors constant</strong></li>
      <li>Use <strong>unstandardized b</strong> when predictors are on meaningful scales</li>
      <li>Use <strong>standardized β</strong> to compare relative importance of predictors</li>
      <li>Check <strong>VIF</strong> before interpreting coefficients—multicollinearity is a common problem</li>
      <li>Adjusted R² is better than R² when comparing models with different numbers of predictors</li>
      <li>More predictors ≠ better model—balance fit with simplicity (Ockham's razor)</li>
    </ul>
  </div>

  <div class="example-box">
    <h3>Example Interpretation</h3>
    <p><strong>Research Question:</strong> Predicting exam scores from study hours, IQ, and motivation</p>
    <p><strong>Results:</strong></p>
    <table>
      <tr><th>Predictor</th><th>b</th><th>SE</th><th>β</th><th>t</th><th>p</th><th>VIF</th></tr>
      <tr><td>Intercept</td><td>15.2</td><td>8.5</td><td>—</td><td>1.8</td><td>.08</td><td>—</td></tr>
      <tr><td>Study Hours</td><td>2.8</td><td>0.6</td><td>.52</td><td>4.7</td><td><.001</td><td>1.2</td></tr>
      <tr><td>IQ</td><td>0.4</td><td>0.1</td><td>.38</td><td>4.0</td><td><.001</td><td>1.1</td></tr>
      <tr><td>Motivation</td><td>1.5</td><td>0.5</td><td>.25</td><td>3.0</td><td>.004</td><td>1.3</td></tr>
    </table>
    <p>R² = .68, Adjusted R² = .65</p>

    <p><strong>Interpretation:</strong></p>
    <ul>
      <li>The model explains <strong>68% of variance</strong> in exam scores</li>
      <li><strong>Study Hours:</strong> Controlling for IQ and motivation, each additional hour of study predicts a 2.8-point increase in exam scores (b = 2.8, p < .001)</li>
      <li><strong>IQ:</strong> Controlling for study hours and motivation, each IQ point predicts a 0.4-point increase in exam scores (b = 0.4, p < .001)</li>
      <li><strong>Relative importance:</strong> Study hours has the strongest effect (β = .52), followed by IQ (β = .38) and motivation (β = .25)</li>
      <li><strong>Multicollinearity:</strong> All VIF values < 2, indicating no multicollinearity problems</li>
    </ul>
  </div>

  <div class="warning-box">
    <h3>Common Pitfalls</h3>
    <ul>
      <li><strong>Ignoring multicollinearity:</strong> Always check VIF before interpreting coefficients</li>
      <li><strong>Comparing b values across predictors:</strong> Use β for comparisons, not b</li>
      <li><strong>Adding too many predictors:</strong> Risk of overfitting, especially in small samples</li>
      <li><strong>Confusing "controlling for" with causation:</strong> Multiple regression doesn't establish causality</li>
      <li><strong>Not checking assumptions:</strong> Multiple regression has the same assumptions as simple regression</li>
    </ul>
  </div>
</section>
    `
  },
  {
    id: 'regression-inference',
    moduleId: 'module-8',
    chapter: 'chapter-12',
    title: 'Regression Inference',
    description: 'Hypothesis tests for regression coefficients and overall model fit.',
    icon: 'F',
    contentHtml: `
<section class="topic-content">
  <h2>Regression Inference and Hypothesis Testing</h2>

  <div class="concept-box">
    <h3>Two Types of Hypothesis Tests in Regression</h3>
    <p>Regression analysis includes two main types of hypothesis tests:</p>
    <ol>
      <li><strong>Overall model test (F-test):</strong> Tests whether the model as a whole predicts the outcome better than chance</li>
      <li><strong>Individual coefficient tests (t-tests):</strong> Tests whether each predictor has a significant effect</li>
    </ol>
  </div>

  <div class="concept-box">
    <h3>Testing the Overall Model: F-test</h3>

    <h4>Hypotheses</h4>
    <ul>
      <li><strong>H₀:</strong> All regression coefficients equal zero (b₁ = b₂ = ... = b<sub>K</sub> = 0)</li>
      <li><strong>H₁:</strong> At least one coefficient is non-zero (model predicts outcome)</li>
    </ul>

    <h4>F-Statistic</h4>
    <div class="formula">
      <p><strong>F = MS<sub>model</sub> / MS<sub>residual</sub></strong></p>
      <p>Where:</p>
      <p>MS<sub>model</sub> = SS<sub>model</sub> / df<sub>model</sub></p>
      <p>MS<sub>residual</sub> = SS<sub>residual</sub> / df<sub>residual</sub></p>
    </div>

    <h4>Degrees of Freedom</h4>
    <ul>
      <li><strong>df<sub>model</sub> = K</strong> (number of predictors)</li>
      <li><strong>df<sub>residual</sub> = N - K - 1</strong> (sample size minus predictors minus intercept)</li>
    </ul>

    <h4>Interpretation</h4>
    <ul>
      <li>Large F-values indicate the model fits significantly better than a model with no predictors</li>
      <li>If p < α (typically .05), reject H₀ and conclude the model is significant</li>
      <li>A significant F-test means <strong>at least one predictor</strong> is useful</li>
      <li>For simple regression: F = t² (F-test and t-test are equivalent)</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>Testing Individual Coefficients: t-tests</h3>

    <h4>Hypotheses</h4>
    <ul>
      <li><strong>H₀:</strong> b<sub>k</sub> = 0 (predictor k has no effect)</li>
      <li><strong>H₁:</strong> b<sub>k</sub> ≠ 0 (predictor k has a significant effect)</li>
    </ul>

    <h4>t-Statistic</h4>
    <div class="formula">
      <p><strong>t = b̂<sub>k</sub> / SE(b̂<sub>k</sub>)</strong></p>
    </div>
    <ul>
      <li><strong>b̂<sub>k</sub></strong> = estimated coefficient</li>
      <li><strong>SE(b̂<sub>k</sub>)</strong> = standard error of the coefficient</li>
      <li><strong>df = N - K - 1</strong></li>
    </ul>

    <h4>Interpretation</h4>
    <ul>
      <li>Large |t| values indicate the coefficient is significantly different from zero</li>
      <li>If p < α, reject H₀ and conclude the predictor has a significant effect</li>
      <li>Each t-test examines one predictor <strong>controlling for all other predictors</strong></li>
      <li>It's possible for the overall F-test to be significant while some individual t-tests are not</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>Confidence Intervals for Coefficients</h3>
    <div class="formula">
      <p><strong>CI(b<sub>k</sub>) = b̂<sub>k</sub> ± t<sub>crit</sub> × SE(b̂<sub>k</sub>)</strong></p>
    </div>
    <p>Where t<sub>crit</sub> is the critical t-value (typically for 95% CI)</p>

    <h4>Interpretation</h4>
    <ul>
      <li>We are 95% confident that the <strong>true population coefficient</strong> falls within this interval</li>
      <li>If the CI <strong>does not include zero</strong>, the coefficient is significant at α = .05</li>
      <li>Wider CIs indicate more uncertainty in the estimate</li>
      <li>Example: CI = [1.5, 4.8] means we're 95% confident the true effect is between 1.5 and 4.8 units</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>Relationship Between F, t, R², and r</h3>

    <h4>For Simple Regression (one predictor):</h4>
    <ul>
      <li><strong>F = t²</strong> (F-test and t-test are equivalent)</li>
      <li><strong>R² = r²</strong> (coefficient of determination equals squared correlation)</li>
      <li>All tests provide the same information about significance</li>
    </ul>

    <h4>For Multiple Regression:</h4>
    <ul>
      <li>F-test examines the <strong>overall model</strong></li>
      <li>Each t-test examines <strong>one predictor controlling for others</strong></li>
      <li>R² represents <strong>all predictors together</strong></li>
      <li>These provide different but complementary information</li>
    </ul>
  </div>

  <div class="jamovi-box">
    <h3>Viewing Hypothesis Tests in jamovi</h3>
    <ol>
      <li>Run your regression: <strong>Analyses → Regression → Linear Regression</strong></li>
      <li><strong>F-test:</strong> Automatically displayed in the <strong>Model Fit Measures</strong> table
        <ul>
          <li>Look for F-statistic, df, and p-value</li>
        </ul>
      </li>
      <li><strong>t-tests:</strong> Displayed in the <strong>Model Coefficients</strong> table
        <ul>
          <li>Each row shows: estimate (b), SE, t-statistic, and p-value</li>
        </ul>
      </li>
      <li><strong>Confidence Intervals:</strong> Check "Confidence interval" under Model Coefficients
        <ul>
          <li>Default is 95%, but can be changed</li>
        </ul>
      </li>
    </ol>
  </div>

  <div class="key-points">
    <h3>Key Points</h3>
    <ul>
      <li>The <strong>F-test</strong> tells you if the overall model is useful</li>
      <li>The <strong>t-tests</strong> tell you which specific predictors are significant</li>
      <li>In multiple regression, a predictor can be non-significant even if the model is significant</li>
      <li>Confidence intervals provide <strong>range estimates</strong>, not just yes/no answers</li>
      <li>Statistical significance ≠ practical significance—consider effect sizes</li>
      <li>Always report both the <strong>coefficient estimate and its uncertainty</strong> (CI or SE)</li>
    </ul>
  </div>

  <div class="example-box">
    <h3>Example Interpretation</h3>
    <p><strong>Research Question:</strong> Predicting job performance from experience, training, and personality</p>
    <p><strong>Results:</strong></p>

    <p><strong>Overall Model:</strong> F(3, 96) = 12.8, p < .001, R² = .29</p>

    <table>
      <tr><th>Predictor</th><th>b</th><th>SE</th><th>95% CI</th><th>t</th><th>p</th></tr>
      <tr><td>Intercept</td><td>35.2</td><td>5.8</td><td>[23.7, 46.7]</td><td>6.1</td><td><.001</td></tr>
      <tr><td>Experience</td><td>2.4</td><td>0.5</td><td>[1.4, 3.4]</td><td>4.8</td><td><.001</td></tr>
      <tr><td>Training</td><td>3.1</td><td>0.8</td><td>[1.5, 4.7]</td><td>3.9</td><td><.001</td></tr>
      <tr><td>Personality</td><td>0.6</td><td>0.4</td><td>[-0.2, 1.4]</td><td>1.5</td><td>.14</td></tr>
    </table>

    <p><strong>Interpretation:</strong></p>
    <ul>
      <li><strong>Overall model:</strong> The model significantly predicts job performance, F(3, 96) = 12.8, p < .001, explaining 29% of the variance (R² = .29)</li>
      <li><strong>Experience:</strong> Significantly predicts performance (b = 2.4, p < .001). Each additional year of experience predicts a 2.4-point increase in performance, 95% CI [1.4, 3.4]</li>
      <li><strong>Training:</strong> Significantly predicts performance (b = 3.1, p < .001). Each additional hour of training predicts a 3.1-point increase, 95% CI [1.5, 4.7]</li>
      <li><strong>Personality:</strong> Does not significantly predict performance after controlling for experience and training (b = 0.6, p = .14). The CI [-0.2, 1.4] includes zero, confirming non-significance</li>
    </ul>
  </div>

  <div class="warning-box">
    <h3>Common Pitfalls</h3>
    <ul>
      <li><strong>Confusing F and t:</strong> F tests the overall model; t tests individual predictors</li>
      <li><strong>Only reporting p-values:</strong> Always report effect sizes (b or β) and CIs</li>
      <li><strong>Assuming non-significant = zero effect:</strong> Non-significance means insufficient evidence, not proof of no effect</li>
      <li><strong>Multiple testing:</strong> Testing many predictors increases Type I error risk</li>
      <li><strong>Ignoring practical significance:</strong> A tiny effect can be statistically significant with large N</li>
    </ul>
  </div>
</section>
    `
  },
  {
    id: 'regression-assumptions',
    moduleId: 'module-8',
    chapter: 'chapter-12',
    title: 'Regression Diagnostics',
    description: 'Checking assumptions, identifying outliers and influential observations.',
    icon: '✓',
    contentHtml: `
<section class="topic-content">
  <h2>Regression Assumptions and Diagnostics</h2>

  <div class="concept-box">
    <h3>Why Check Assumptions?</h3>
    <p>Regression results can be <strong>misleading or invalid</strong> if key assumptions are violated. Checking assumptions helps you:</p>
    <ul>
      <li>Ensure your statistical tests are valid</li>
      <li>Identify potential problems with your model</li>
      <li>Determine if transformations or alternative methods are needed</li>
      <li>Detect influential observations that might be driving results</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>Key Assumptions of Linear Regression</h3>

    <h4>1. Normality</h4>
    <ul>
      <li><strong>Assumption:</strong> Residuals (errors) are normally distributed</li>
      <li><strong>Check with:</strong> Q-Q plot, histogram of residuals</li>
      <li><strong>Impact if violated:</strong> Hypothesis tests and CIs may be inaccurate (especially in small samples)</li>
      <li><strong>What to do:</strong> Consider transformations, bootstrapping, or robust methods</li>
    </ul>

    <h4>2. Linearity</h4>
    <ul>
      <li><strong>Assumption:</strong> Relationship between X and Y is linear</li>
      <li><strong>Check with:</strong> Scatterplot, residuals vs. fitted values plot</li>
      <li><strong>Impact if violated:</strong> Model predictions will be systematically wrong</li>
      <li><strong>What to do:</strong> Add polynomial terms, use non-linear models, or transform variables</li>
    </ul>

    <h4>3. Homogeneity of Variance (Homoscedasticity)</h4>
    <ul>
      <li><strong>Assumption:</strong> Variance of residuals is constant across all levels of predictors</li>
      <li><strong>Check with:</strong> Residuals vs. fitted values plot (should show random scatter)</li>
      <li><strong>Impact if violated:</strong> Standard errors and hypothesis tests are incorrect</li>
      <li><strong>What to do:</strong> Transform Y, use weighted least squares, or robust standard errors</li>
    </ul>

    <h4>4. Independence</h4>
    <ul>
      <li><strong>Assumption:</strong> Residuals are independent (no patterns or correlations)</li>
      <li><strong>Check with:</strong> Consider study design, plot residuals over time/space</li>
      <li><strong>Impact if violated:</strong> Standard errors are wrong, leading to incorrect inferences</li>
      <li><strong>What to do:</strong> Use time series methods, multilevel models, or adjust for clustering</li>
    </ul>

    <h4>5. No Multicollinearity (Multiple Regression)</h4>
    <ul>
      <li><strong>Assumption:</strong> Predictors are not highly correlated with each other</li>
      <li><strong>Check with:</strong> VIF (Variance Inflation Factor)</li>
      <li><strong>Impact if violated:</strong> Coefficients become unstable and hard to interpret</li>
      <li><strong>What to do:</strong> Remove redundant predictors or combine them</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>Types of Residuals</h3>

    <h4>Ordinary Residuals</h4>
    <div class="formula">
      <p><strong>ε<sub>i</sub> = Y<sub>i</sub> - Ŷ<sub>i</sub></strong></p>
    </div>
    <p>The raw difference between observed and predicted values</p>

    <h4>Standardized Residuals</h4>
    <div class="formula">
      <p><strong>ε'<sub>i</sub> = ε<sub>i</sub> / (σ̂√(1-h<sub>i</sub>))</strong></p>
    </div>
    <p>Scaled to have SD ≈ 1; easier to identify unusual values</p>

    <h4>Studentized Residuals</h4>
    <div class="formula">
      <p><strong>ε*<sub>i</sub> = ε<sub>i</sub> / (σ̂<sub>(-i)</sub>√(1-h<sub>i</sub>))</strong></p>
    </div>
    <p>Uses σ̂ estimated without observation i; best for detecting outliers</p>
    <ul>
      <li>Follow a t-distribution</li>
      <li>|ε*| > 3 suggests a potential outlier</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>Identifying Problematic Observations</h3>

    <h4>Outliers</h4>
    <ul>
      <li><strong>Definition:</strong> Observations with unusual Y values (large residuals)</li>
      <li><strong>Detection:</strong> Large Studentized residuals (|ε*| > 3)</li>
      <li><strong>Impact:</strong> Can affect model fit and coefficient estimates</li>
    </ul>

    <h4>High Leverage Points</h4>
    <ul>
      <li><strong>Definition:</strong> Observations with unusual X values</li>
      <li><strong>Detection:</strong> Hat values (h<sub>i</sub>); rule of thumb: h<sub>i</sub> > 2(K+1)/N</li>
      <li><strong>Impact:</strong> <em>Potential</em> to influence the regression line</li>
    </ul>

    <h4>Influential Observations</h4>
    <ul>
      <li><strong>Definition:</strong> Observations that are <strong>both outliers AND high leverage</strong></li>
      <li><strong>Detection:</strong> Cook's Distance</li>
      <li><strong>Impact:</strong> Strongly affect regression coefficients</li>
    </ul>

    <h4>Cook's Distance</h4>
    <div class="formula">
      <p><strong>D<sub>i</sub> = (ε*<sub>i</sub>² / (K+1)) × (h<sub>i</sub> / (1-h<sub>i</sub>))</strong></p>
    </div>
    <p>Measures how much coefficients change when observation i is removed</p>
    <ul>
      <li><strong>D<sub>i</sub> > 1:</strong> Highly influential (definitely investigate)</li>
      <li><strong>D<sub>i</sub> > 4/N:</strong> Potentially influential (consider investigating)</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>What to Do About Problematic Points</h3>
    <ol>
      <li><strong>Investigate:</strong> Check if the value is a data entry error or measurement mistake</li>
      <li><strong>Understand:</strong> Is this a genuine but unusual case, or does it represent a different population?</li>
      <li><strong>Report:</strong> Always report influential observations and how you handled them</li>
      <li><strong>Analyze with and without:</strong> Run regression both ways and compare results</li>
      <li><strong>Don't automatically delete:</strong> Outliers can contain important information</li>
    </ol>
  </div>

  <div class="jamovi-box">
    <h3>Checking Assumptions in jamovi</h3>
    <ol>
      <li>Run your regression: <strong>Analyses → Regression → Linear Regression</strong></li>
      <li>Under <strong>Assumption Checks</strong>:
        <ul>
          <li>Check <strong>Q-Q plot of residuals</strong> (normality check)</li>
          <li>Check <strong>Residual plots</strong> (linearity and homoscedasticity)</li>
          <li>Check <strong>Cook's distance</strong> (influential observations)</li>
          <li>Check <strong>Collinearity statistics</strong> (VIF for multicollinearity)</li>
        </ul>
      </li>
      <li><strong>Interpreting plots:</strong>
        <ul>
          <li><strong>Q-Q plot:</strong> Points should fall along the diagonal line</li>
          <li><strong>Residuals vs. Fitted:</strong> Should show random scatter (no patterns)</li>
          <li><strong>Scale-Location:</strong> Should show horizontal line (equal variance)</li>
        </ul>
      </li>
    </ol>
  </div>

  <div class="key-points">
    <h3>Key Points</h3>
    <ul>
      <li><strong>Always check assumptions</strong> before interpreting regression results</li>
      <li>Q-Q plot is the best tool for checking <strong>normality of residuals</strong></li>
      <li>Residuals vs. fitted plot checks <strong>linearity and homoscedasticity</strong></li>
      <li>Cook's distance identifies <strong>influential observations</strong></li>
      <li>VIF checks for <strong>multicollinearity</strong> in multiple regression</li>
      <li>Violations don't always invalidate results—understand the impact</li>
      <li>Report how you handled assumption violations and influential points</li>
    </ul>
  </div>

  <div class="example-box">
    <h3>Example: Interpreting Diagnostic Plots</h3>

    <h4>Scenario 1: Good Model</h4>
    <ul>
      <li><strong>Q-Q plot:</strong> Points fall along diagonal → normality assumption met</li>
      <li><strong>Residuals vs. fitted:</strong> Random scatter, no pattern → linearity and homoscedasticity met</li>
      <li><strong>Cook's D:</strong> All values < 1 → no influential observations</li>
      <li><strong>VIF:</strong> All < 5 → no multicollinearity</li>
      <li><strong>Conclusion:</strong> Assumptions are satisfied; results are trustworthy</li>
    </ul>

    <h4>Scenario 2: Problems Detected</h4>
    <ul>
      <li><strong>Q-Q plot:</strong> Points deviate at tails → residuals not quite normal</li>
      <li><strong>Residuals vs. fitted:</strong> Funnel shape (wider on right) → heteroscedasticity</li>
      <li><strong>Cook's D:</strong> One observation with D = 1.8 → highly influential</li>
      <li><strong>Action needed:</strong>
        <ul>
          <li>Investigate the influential observation (is it an error?)</li>
          <li>Consider log transformation of Y to address heteroscedasticity</li>
          <li>Run analysis with and without the influential point</li>
          <li>Consider robust regression methods</li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="warning-box">
    <h3>Common Pitfalls</h3>
    <ul>
      <li><strong>Not checking assumptions:</strong> Results can be completely wrong if assumptions are badly violated</li>
      <li><strong>Checking normality of Y instead of residuals:</strong> It's the residuals that need to be normal, not Y</li>
      <li><strong>Automatically deleting outliers:</strong> Investigate first—they might be your most interesting cases</li>
      <li><strong>Ignoring patterns in residual plots:</strong> Systematic patterns indicate model problems</li>
      <li><strong>Only looking at R²:</strong> High R² doesn't mean assumptions are met</li>
    </ul>
  </div>
</section>
    `
  },
  {
    id: 'model-selection',
    moduleId: 'module-8',
    chapter: 'chapter-12',
    title: 'Model Selection',
    description: 'Comparing and selecting regression models using AIC and hierarchical methods.',
    icon: 'Δ',
    contentHtml: `
<section class="topic-content">
  <h2>Model Selection and Comparison</h2>

  <div class="concept-box">
    <h3>What is Model Selection?</h3>
    <p><strong>Model selection</strong> is the process of choosing which predictors to include in your regression model. The goal is to find a model that:</p>
    <ul>
      <li>Fits the data well</li>
      <li>Is parsimonious (simple)</li>
      <li>Generalizes to new data</li>
      <li>Answers your research questions</li>
    </ul>
    <p>This involves balancing <strong>model complexity</strong> (more predictors) with <strong>model fit</strong> (explained variance).</p>
  </div>

  <div class="concept-box">
    <h3>Guiding Principles</h3>

    <h4>1. Theory First</h4>
    <ul>
      <li>Use <strong>substantive theory</strong> to guide predictor selection when possible</li>
      <li>Include variables based on theoretical importance, not just statistical significance</li>
      <li>Data-driven selection should supplement, not replace, theoretical reasoning</li>
    </ul>

    <h4>2. Ockham's Razor</h4>
    <ul>
      <li><strong>Simpler models are preferable</strong> if they fit nearly as well as complex models</li>
      <li>Every predictor added increases risk of overfitting</li>
      <li>Parsimony improves interpretability and generalizability</li>
    </ul>

    <h4>3. Avoid Overfitting</h4>
    <ul>
      <li><strong>Overfitting:</strong> Model fits sample data well but generalizes poorly to new data</li>
      <li>More common with many predictors and small samples</li>
      <li>Use cross-validation or hold-out samples to assess generalization</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>Akaike Information Criterion (AIC)</h3>
    <div class="formula">
      <p><strong>AIC = (SS<sub>residual</sub> / σ̂²) + 2K</strong></p>
    </div>
    <p>Where K is the number of predictors (not counting intercept)</p>

    <h4>How AIC Works</h4>
    <ul>
      <li>Balances <strong>goodness of fit</strong> (first term) with <strong>model complexity</strong> (second term)</li>
      <li><strong>Lower AIC = better model</strong></li>
      <li>Penalizes adding predictors that don't improve fit enough</li>
      <li>Can compare non-nested models</li>
    </ul>

    <h4>Using AIC</h4>
    <ul>
      <li>Compare AIC values across different models</li>
      <li>Difference of <strong>4-7 points</strong> suggests meaningful improvement</li>
      <li>Difference of <strong>10+ points</strong> indicates strong evidence for better model</li>
      <li>AIC doesn't tell you if models are "good," only which is better</li>
    </ul>

    <h4>Alternative: BIC (Bayesian Information Criterion)</h4>
    <div class="formula">
      <p><strong>BIC = (SS<sub>residual</sub> / σ̂²) + K × log(N)</strong></p>
    </div>
    <ul>
      <li>Penalizes complexity more heavily than AIC</li>
      <li>Tends to select simpler models</li>
      <li>Better for confirming a "true" model exists</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>Model Selection Strategies</h3>

    <h4>1. Forward Selection</h4>
    <ul>
      <li><strong>Start:</strong> No predictors (intercept-only model)</li>
      <li><strong>Step:</strong> Add predictor that improves fit most</li>
      <li><strong>Repeat:</strong> Continue adding until no predictor improves fit significantly</li>
      <li><strong>Pro:</strong> Builds model systematically from ground up</li>
      <li><strong>Con:</strong> Can miss important predictor combinations</li>
    </ul>

    <h4>2. Backward Elimination</h4>
    <ul>
      <li><strong>Start:</strong> All predictors included</li>
      <li><strong>Step:</strong> Remove predictor that hurts fit least</li>
      <li><strong>Repeat:</strong> Continue removing until all remaining predictors are significant</li>
      <li><strong>Pro:</strong> Considers all predictors initially</li>
      <li><strong>Con:</strong> Can be unstable with multicollinearity</li>
    </ul>

    <h4>3. Stepwise Regression</h4>
    <ul>
      <li>Combines forward and backward steps</li>
      <li>Can add and remove predictors at each step</li>
      <li><strong>Pro:</strong> More flexible than forward/backward alone</li>
      <li><strong>Con:</strong> Can produce unstable results, inflates Type I error</li>
    </ul>

    <h4>4. Hierarchical Regression</h4>
    <ul>
      <li><strong>Theory-driven approach:</strong> Enter predictors in meaningful blocks</li>
      <li>Block 1: Control variables or baseline predictors</li>
      <li>Block 2: Variables of primary interest</li>
      <li>Compare models to see how much variance each block adds</li>
      <li><strong>Best approach</strong> when you have clear theoretical predictions</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>Comparing Nested Models</h3>
    <p><strong>Nested models:</strong> One model is a subset of another (e.g., Model 1 has X₁; Model 2 has X₁ and X₂)</p>

    <h4>F-test for Model Comparison</h4>
    <div class="formula">
      <p><strong>F = [(SS¹<sub>res</sub> - SS²<sub>res</sub>) / k] / [SS²<sub>res</sub> / (N - p - 1)]</strong></p>
    </div>
    <p>Where:</p>
    <ul>
      <li>SS¹<sub>res</sub> = residual SS from simpler model</li>
      <li>SS²<sub>res</sub> = residual SS from complex model</li>
      <li>k = number of additional predictors in complex model</li>
      <li>p = total predictors in complex model</li>
    </ul>

    <h4>Comparing ΔR²</h4>
    <ul>
      <li><strong>ΔR² = R²<sub>full</sub> - R²<sub>reduced</sub></strong></li>
      <li>Represents additional variance explained by new predictors</li>
      <li>F-test determines if ΔR² is statistically significant</li>
      <li>Report both the magnitude (ΔR²) and significance (F-test)</li>
    </ul>
  </div>

  <div class="jamovi-box">
    <h3>Model Selection in jamovi</h3>

    <h4>Method 1: Manual Comparison (AIC)</h4>
    <ol>
      <li>Run <strong>Linear Regression</strong> for each model</li>
      <li>Under <strong>Model Fit</strong>, check <strong>AIC</strong></li>
      <li>Compare AIC values across models</li>
      <li>Choose model with lowest AIC (considering theory)</li>
    </ol>

    <h4>Method 2: Hierarchical Regression (Model Builder)</h4>
    <ol>
      <li>Go to <strong>Analyses → Regression → Linear Regression</strong></li>
      <li>Click <strong>Model Builder</strong></li>
      <li><strong>Block 1:</strong> Add first set of predictors</li>
      <li><strong>Block 2:</strong> Add second set of predictors</li>
      <li>View <strong>Model Comparisons</strong> table for:
        <ul>
          <li>ΔR² between models</li>
          <li>F-test comparing models</li>
          <li>AIC for each model</li>
        </ul>
      </li>
    </ol>

    <h4>Method 3: Stepwise (Advanced)</h4>
    <ol>
      <li>Some statistical software offers automated stepwise selection</li>
      <li><strong>Warning:</strong> Automated selection should be used cautiously</li>
      <li>Theory-driven selection is generally preferred</li>
    </ol>
  </div>

  <div class="key-points">
    <h3>Key Points</h3>
    <ul>
      <li><strong>Theory should guide model selection</strong> whenever possible</li>
      <li>Use <strong>AIC</strong> to compare models—lower is better</li>
      <li><strong>Simpler models are preferable</strong> if they fit nearly as well (Ockham's razor)</li>
      <li>For nested models, use <strong>F-test and ΔR²</strong> to compare</li>
      <li><strong>Hierarchical regression</strong> is best for testing theoretical predictions</li>
      <li>Avoid purely automated stepwise selection—it inflates Type I error</li>
      <li>Always validate your final model on new data if possible</li>
    </ul>
  </div>

  <div class="example-box">
    <h3>Example: Hierarchical Regression</h3>
    <p><strong>Research Question:</strong> Does personality predict job performance above and beyond experience?</p>

    <p><strong>Model 1 (Control):</strong> Experience only</p>
    <ul>
      <li>R² = .18, AIC = 542.3</li>
    </ul>

    <p><strong>Model 2 (Full):</strong> Experience + Personality</p>
    <ul>
      <li>R² = .34, AIC = 528.7</li>
    </ul>

    <p><strong>Model Comparison:</strong></p>
    <ul>
      <li>ΔR² = .34 - .18 = <strong>.16</strong></li>
      <li>F(1, 97) = 23.5, p < .001</li>
      <li>ΔAIC = 542.3 - 528.7 = <strong>13.6</strong> (strongly favors Model 2)</li>
    </ul>

    <p><strong>Interpretation:</strong></p>
    <ul>
      <li>Adding personality to the model significantly improves prediction, ΔR² = .16, F(1, 97) = 23.5, p < .001</li>
      <li>Personality explains an <strong>additional 16% of variance</strong> in job performance beyond experience alone</li>
      <li>Both the F-test and AIC difference strongly support including personality in the model</li>
      <li>The full model (Model 2) is clearly superior and should be retained</li>
    </ul>
  </div>

  <div class="warning-box">
    <h3>Common Pitfalls</h3>
    <ul>
      <li><strong>Purely data-driven selection:</strong> Can capitalize on chance—use theory</li>
      <li><strong>P-value hunting:</strong> Adding/removing predictors just to get p < .05</li>
      <li><strong>Ignoring multicollinearity:</strong> Check VIF even in selected model</li>
      <li><strong>Not validating:</strong> Final model should be tested on new data</li>
      <li><strong>Overfitting with stepwise:</strong> Automated methods increase Type I error</li>
      <li><strong>Comparing non-nested models with F-test:</strong> Use AIC instead</li>
      <li><strong>Choosing based on R² alone:</strong> Consider AIC, theory, and parsimony</li>
    </ul>
  </div>
</section>
    `
  },

  // ============================================================
  // CHAPTER 13: COMPARING SEVERAL MEANS (ONE-WAY ANOVA)
  // ============================================================

  // Topic: Introduction to ANOVA
  {
    id: 'one-way-anova-basics',
    moduleId: 'module-8',
    chapter: 'chapter-13',
    title: 'One-Way ANOVA Basics',
    description: 'Comparing means across three or more groups.',
    icon: 'F',
    contentHtml: `
<section class="module-content" aria-labelledby="anova-basics-title">
  <h2 id="anova-basics-title">13.1-13.3 Introduction to One-Way ANOVA</h2>

  <div class="concept-box" role="note">
    <h3>What is ANOVA?</h3>
    <p><strong>Analysis of Variance (ANOVA)</strong> tests whether group means differ significantly. Despite its name, ANOVA analyzes <em>means</em> by partitioning <em>variance</em>.</p>
    <p><strong>One-way ANOVA:</strong> One categorical predictor (factor) with 3+ levels, one continuous outcome.</p>
  </div>

  <h3>When to Use One-Way ANOVA</h3>
  <ul>
    <li><strong>3+ groups:</strong> Comparing means across multiple conditions</li>
    <li><strong>Independent groups:</strong> Different participants in each group (between-subjects)</li>
    <li><strong>Continuous outcome:</strong> Interval or ratio scale dependent variable</li>
    <li><strong>Single factor:</strong> One grouping variable</li>
  </ul>

  <div class="example-box">
    <h4>Example: Clinical Trial</h4>
    <p><strong>Research Question:</strong> Do three drugs (Placebo, Anxifree, Joyzepam) differ in mood improvement?</p>
    <ul>
      <li><strong>Groups (k=3):</strong> Placebo, Anxifree, Joyzepam</li>
      <li><strong>Outcome:</strong> Mood gain (-5 to +5)</li>
      <li><strong>N = 18:</strong> 6 participants per group</li>
    </ul>
    <table class="stats-table">
      <tr><th>Group</th><th>Mean</th><th>SD</th></tr>
      <tr><td>Placebo</td><td>0.45</td><td>0.28</td></tr>
      <tr><td>Anxifree</td><td>0.72</td><td>0.27</td></tr>
      <tr><td>Joyzepam</td><td>1.48</td><td>0.21</td></tr>
    </table>
  </div>

  <h3>Hypotheses</h3>
  <div class="formula-box">
    <p><strong>H₀:</strong> μ_placebo = μ_Anxifree = μ_Joyzepam (all means equal)</p>
    <p><strong>H₁:</strong> At least one mean differs</p>
    <p><em>Note:</em> ANOVA is <strong>omnibus</strong> — it tests overall difference, not specific pairs</p>
  </div>

  <h3>The Logic Behind ANOVA</h3>
  <p>ANOVA partitions total variance into two sources:</p>
  <ul>
    <li><strong>Between-groups variance (SS_b):</strong> Differences among group means</li>
    <li><strong>Within-groups variance (SS_w):</strong> Variability within each group (error)</li>
  </ul>
  <div class="formula-box">
    <p>SS_total = SS_between + SS_within</p>
    <p><strong>F-ratio = MS_between / MS_within</strong></p>
    <p>If groups differ, SS_between is large relative to SS_within → Large F → Reject H₀</p>
  </div>

  <h3>The Mathematics Behind ANOVA</h3>

  <h4>Step 1: Understanding the Notation</h4>
  <p>First, let's define our notation clearly:</p>
  <div class="formula-box">
    <ul>
      <li><strong>G</strong> = number of groups (in our example, G = 3 drugs)</li>
      <li><strong>N</strong> = total sample size (N = 18 people)</li>
      <li><strong>N<sub>k</sub></strong> = number of people in group k (N<sub>k</sub> = 6 per group)</li>
      <li><strong>Y<sub>ik</sub></strong> = score for person i in group k</li>
      <li><strong>Ȳ<sub>k</sub></strong> = mean of group k</li>
      <li><strong>Ȳ</strong> = grand mean (overall average)</li>
    </ul>
  </div>

  <h4>Step 2: Total Sum of Squares (SS<sub>tot</sub>)</h4>
  <p>This measures <em>total variability</em> in the data:</p>
  <div class="formula-box">
    <p><strong>SS<sub>tot</sub> = Σ Σ (Y<sub>ik</sub> - Ȳ)²</strong></p>
    <p>Translation: For every person, calculate how far their score is from the grand mean, square it, and add them all up.</p>
  </div>

  <h4>Step 3: Within-Groups Sum of Squares (SS<sub>w</sub>)</h4>
  <p>This measures variability <em>within each group</em> (individual differences):</p>
  <div class="formula-box">
    <p><strong>SS<sub>w</sub> = Σ Σ (Y<sub>ik</sub> - Ȳ<sub>k</sub>)²</strong></p>
    <p>Translation: For every person, calculate how far their score is from their <em>group mean</em>, square it, and add them all up.</p>
    <p><em>Note:</em> This ignores differences between groups—it only looks at variation within each group.</p>
  </div>

  <h4>Step 4: Between-Groups Sum of Squares (SS<sub>b</sub>)</h4>
  <p>This measures how much the <em>group means differ</em> from each other:</p>
  <div class="formula-box">
    <p><strong>SS<sub>b</sub> = Σ N<sub>k</sub> (Ȳ<sub>k</sub> - Ȳ)²</strong></p>
    <p>Translation: For each group, see how far the group mean is from the grand mean, square it, multiply by group size, and add them up.</p>
    <p><strong>Key insight:</strong> SS<sub>w</sub> + SS<sub>b</sub> = SS<sub>tot</sub></p>
  </div>

  <div class="example-box">
    <h4>Worked Example: Calculating Sums of Squares</h4>
    <p>Let's calculate SS<sub>w</sub> for just the first few observations:</p>
    <table class="stats-table">
      <tr><th>Person</th><th>Group</th><th>Score (Y<sub>ik</sub>)</th><th>Group Mean (Ȳ<sub>k</sub>)</th><th>Y<sub>ik</sub> - Ȳ<sub>k</sub></th><th>(Y<sub>ik</sub> - Ȳ<sub>k</sub>)²</th></tr>
      <tr><td>1</td><td>Placebo</td><td>0.5</td><td>0.45</td><td>0.05</td><td>0.0025</td></tr>
      <tr><td>2</td><td>Placebo</td><td>0.3</td><td>0.45</td><td>-0.15</td><td>0.0225</td></tr>
      <tr><td>3</td><td>Placebo</td><td>0.1</td><td>0.45</td><td>-0.35</td><td>0.1225</td></tr>
      <tr><td>4</td><td>Anxifree</td><td>0.6</td><td>0.72</td><td>-0.12</td><td>0.0144</td></tr>
      <tr><td>5</td><td>Anxifree</td><td>0.4</td><td>0.72</td><td>-0.32</td><td>0.1024</td></tr>
    </table>
    <p>Sum of squared deviations (for these 5 people) = 0.0025 + 0.0225 + 0.1225 + 0.0144 + 0.1024 = 0.2643</p>
    <p><em>For the full dataset:</em> SS<sub>w</sub> = 1.39</p>
  </div>

  <div class="example-box">
    <h4>Calculating SS<sub>b</sub> (Between-Groups)</h4>
    <table class="stats-table">
      <tr><th>Group</th><th>N<sub>k</sub></th><th>Ȳ<sub>k</sub></th><th>Ȳ</th><th>Ȳ<sub>k</sub> - Ȳ</th><th>(Ȳ<sub>k</sub> - Ȳ)²</th><th>N<sub>k</sub>(Ȳ<sub>k</sub> - Ȳ)²</th></tr>
      <tr><td>Placebo</td><td>6</td><td>0.45</td><td>0.88</td><td>-0.43</td><td>0.1849</td><td>1.11</td></tr>
      <tr><td>Anxifree</td><td>6</td><td>0.72</td><td>0.88</td><td>-0.16</td><td>0.0256</td><td>0.15</td></tr>
      <tr><td>Joyzepam</td><td>6</td><td>1.48</td><td>0.88</td><td>0.60</td><td>0.3600</td><td>2.16</td></tr>
    </table>
    <p>SS<sub>b</sub> = 1.11 + 0.15 + 2.16 = <strong>3.42</strong></p>
  </div>

  <h4>Step 5: From Sums of Squares to Mean Squares</h4>
  <p>We divide each SS by its <strong>degrees of freedom</strong> to get Mean Squares:</p>
  <div class="formula-box">
    <p><strong>df<sub>between</sub> = G - 1</strong> (number of groups minus 1)</p>
    <p>In our example: df<sub>b</sub> = 3 - 1 = 2</p>
    <br>
    <p><strong>df<sub>within</sub> = N - G</strong> (total sample size minus number of groups)</p>
    <p>In our example: df<sub>w</sub> = 18 - 3 = 15</p>
    <br>
    <p><strong>MS<sub>b</sub> = SS<sub>b</sub> / df<sub>b</sub></strong> = 3.42 / 2 = <strong>1.71</strong></p>
    <p><strong>MS<sub>w</sub> = SS<sub>w</sub> / df<sub>w</sub></strong> = 1.39 / 15 = <strong>0.09</strong></p>
  </div>

  <h4>Step 6: Calculate the F-Ratio</h4>
  <div class="formula-box">
    <p><strong>F = MS<sub>b</sub> / MS<sub>w</sub></strong> = 1.71 / 0.09 = <strong>19.0</strong></p>
    <p><strong>F(2, 15) = 19.0</strong></p>
    <p>Compare to critical value: F<sub>crit</sub>(α = .05, df<sub>1</sub>=2, df<sub>2</sub>=15) = 3.68</p>
    <p>Since 19.0 > 3.68, we <strong>reject H₀</strong></p>
    <p>Or use p-value: p < .001</p>
  </div>

  <div class="concept-box">
    <h4>What Does the F-Ratio Mean?</h4>
    <p><strong>F = Between-group variation / Within-group variation</strong></p>
    <ul>
      <li><strong>F ≈ 1:</strong> Group means don't differ much (variation between groups is about the same as variation within groups)</li>
      <li><strong>F >> 1:</strong> Group means differ substantially (variation between groups is much larger than variation within groups)</li>
      <li>In our example, F = 19 means the differences <em>between</em> drugs are 19 times larger than random individual differences <em>within</em> each drug group!</li>
    </ul>
  </div>

  <div class="jamovi-box">
    <h3>Running One-Way ANOVA in jamovi</h3>
    <ol>
      <li><strong>Analyses → ANOVA → ANOVA</strong></li>
      <li>Move <strong>mood.gain</strong> to "Dependent Variable"</li>
      <li>Move <strong>drug</strong> to "Fixed Factors"</li>
      <li>Under "Effect Size," check <strong>η² (eta-squared)</strong></li>
      <li>Under "Assumption Checks," check <strong>Homogeneity tests</strong> and <strong>Normality (Q-Q plot)</strong></li>
    </ol>
  </div>

  <div class="example-box">
    <h4>Results</h4>
    <p><strong>F(2, 15) = 18.61, p < .001, η² = 0.71</strong></p>
    <p><em>Interpretation:</em> At least one drug differs significantly in mood improvement. 71% of variance in mood gain is explained by drug type.</p>
  </div>

  <div class="key-points-box">
    <h3>Key Points</h3>
    <ul>
      <li>ANOVA tests <strong>omnibus hypothesis</strong> (overall difference)</li>
      <li>F-ratio compares <strong>between-group</strong> to <strong>within-group</strong> variance</li>
      <li>Significant F → at least one mean differs (but not which ones)</li>
      <li>Use <strong>post-hoc tests</strong> to identify specific group differences</li>
      <li>Effect size (η²) measures <strong>proportion of variance explained</strong></li>
    </ul>
  </div>

  <div class="warning-box">
    <h3>Common Mistakes</h3>
    <ul>
      <li><strong>Multiple t-tests instead of ANOVA:</strong> Inflates Type I error</li>
      <li><strong>Ignoring assumptions:</strong> Check normality and homogeneity of variance</li>
      <li><strong>Stopping at F-test:</strong> Need post-hoc tests to identify which groups differ</li>
      <li><strong>Confusing significance with importance:</strong> Always report effect size</li>
    </ul>
  </div>
</section>
    `
  },

  // Topic: Post-Hoc Tests and Multiple Comparisons
  {
    id: 'post-hoc-tests-anova',
    moduleId: 'module-8',
    chapter: 'chapter-13',
    title: 'Post-Hoc Tests & Multiple Comparisons',
    description: 'Identifying which specific groups differ after a significant ANOVA.',
    icon: 'pH',
    contentHtml: `
<section class="module-content" aria-labelledby="posthoc-title">
  <h2 id="posthoc-title">13.5 Multiple Comparisons and Post-Hoc Tests</h2>

  <div class="concept-box" role="note">
    <h3>Why Post-Hoc Tests?</h3>
    <p>ANOVA tells us <em>if</em> groups differ, but not <em>which</em> groups differ. Post-hoc tests compare all pairwise differences while controlling family-wise error rate.</p>
  </div>

  <h3>The Multiple Comparisons Problem</h3>
  <p>Running multiple t-tests inflates Type I error:</p>
  <div class="formula-box">
    <p><strong>3 groups = 3 pairwise comparisons</strong></p>
    <p>If α = .05 for each test:</p>
    <p>Family-wise error rate ≈ 1 - (1-.05)³ = .14 (14% chance of false positive!)</p>
    <p><strong>Solution:</strong> Adjust p-values to control total error rate</p>
  </div>

  <h3>Common Post-Hoc Corrections</h3>

  <h4>1. Bonferroni Correction (Most Conservative)</h4>
  <div class="formula-box">
    <p><strong>p'_j = m × p_j</strong></p>
    <p>Where m = number of comparisons</p>
    <p><em>Example:</em> 3 comparisons, raw p = .02 → adjusted p = 3 × .02 = .06</p>
  </div>
  <ul>
    <li><strong>Pros:</strong> Simple, guarantees family-wise error rate ≤ α</li>
    <li><strong>Cons:</strong> Very conservative (high Type II error)</li>
  </ul>

  <h4>2. Holm Correction (Recommended)</h4>
  <p><strong>Sequential Bonferroni</strong> — less conservative, same Type I error protection:</p>
  <ol>
    <li>Sort p-values from smallest to largest</li>
    <li>Multiply smallest p by m</li>
    <li>For j-th largest p: multiply by (m - j + 1) OR use previous adjusted p (whichever is larger)</li>
  </ol>
  <div class="example-box">
    <h4>Example: Holm Correction</h4>
    <table class="stats-table">
      <tr><th>Comparison</th><th>Raw p</th><th>Rank</th><th>Holm p</th></tr>
      <tr><td>Joyzepam vs Placebo</td><td>.00003</td><td>1 (smallest)</td><td>.00009</td></tr>
      <tr><td>Joyzepam vs Anxifree</td><td>.0005</td><td>2</td><td>.001</td></tr>
      <tr><td>Anxifree vs Placebo</td><td>.15</td><td>3 (largest)</td><td>.15</td></tr>
    </table>
    <p><strong>Conclusion:</strong> Joyzepam > Placebo (p < .001), Joyzepam > Anxifree (p = .001), Anxifree ≈ Placebo (p = .15)</p>
  </div>

  <div class="jamovi-box">
    <h3>Post-Hoc Tests in jamovi</h3>
    <ol>
      <li>In ANOVA analysis, go to <strong>Post Hoc Tests</strong></li>
      <li>Move <strong>drug</strong> to the right panel</li>
      <li>Under "Correction," select <strong>Holm</strong> (recommended)</li>
      <li>Results show all pairwise comparisons with adjusted p-values</li>
    </ol>
  </div>

  <h3>Other Corrections</h3>
  <ul>
    <li><strong>Tukey HSD:</strong> Good for balanced designs (equal group sizes)</li>
    <li><strong>Šidák:</strong> Slightly less conservative than Bonferroni</li>
    <li><strong>No correction:</strong> Only use if comparisons were <em>planned a priori</em></li>
  </ul>

  <div class="key-points-box">
    <h3>Key Points</h3>
    <ul>
      <li><strong>Always use correction</strong> for post-hoc (unplanned) comparisons</li>
      <li><strong>Holm correction</strong> is the go-to method (more powerful than Bonferroni)</li>
      <li>Report adjusted p-values in results</li>
      <li>Don't run post-hoc if ANOVA is non-significant (protects against fishing)</li>
    </ul>
  </div>

  <div class="warning-box">
    <h3>Writing Up Post-Hoc Results</h3>
    <p><em>Post-hoc tests (using the Holm correction to adjust p) indicated that Joyzepam produced significantly larger mood change than both Anxifree (p = .001) and placebo (p < .001). We found no evidence that Anxifree performed better than placebo (p = .15).</em></p>
  </div>
</section>
    `
  },

  // Topic: ANOVA Assumptions
  {
    id: 'anova-assumptions',
    moduleId: 'module-8',
    chapter: 'chapter-13',
    title: 'ANOVA Assumptions',
    description: 'Checking normality, homogeneity of variance, and independence.',
    icon: '✓',
    contentHtml: `
<section class="module-content" aria-labelledby="assumptions-title">
  <h2 id="assumptions-title">13.6 Assumptions of One-Way ANOVA</h2>

  <div class="concept-box" role="note">
    <h3>The Three Key Assumptions</h3>
    <p>ANOVA assumes residuals (ε) are <strong>normally distributed</strong>, with <strong>equal variance</strong> across groups, and <strong>independent</strong> of each other.</p>
  </div>

  <h3>1. Homogeneity of Variance (Homoscedasticity)</h3>
  <p><strong>Assumption:</strong> Population variance σ² is the same for all groups</p>
  <div class="formula-box">
    <p>Var(Group 1) = Var(Group 2) = ... = Var(Group k)</p>
  </div>

  <h4>Testing with Levene's Test</h4>
  <ul>
    <li><strong>H₀:</strong> Variances are equal</li>
    <li><strong>H₁:</strong> At least one variance differs</li>
    <li><strong>Decision:</strong> If p > .05, assume equal variances</li>
  </ul>
  <div class="jamovi-box">
    <h4>In jamovi</h4>
    <p>Under "Assumption Checks," select <strong>Homogeneity tests</strong></p>
    <p><em>Example result:</em> F(2, 15) = 1.45, p = .27 → Assumption met</p>
  </div>

  <h4>If Violated → Use Welch's ANOVA</h4>
  <p>Welch's test does NOT assume equal variances (like Welch's t-test)</p>
  <div class="jamovi-box">
    <p><strong>Analyses → ANOVA → One-Way ANOVA → Welch's</strong></p>
    <p>Reports adjusted F-statistic with modified df</p>
  </div>

  <h3>2. Normality of Residuals</h3>
  <p><strong>Assumption:</strong> Residuals (not raw data!) are normally distributed</p>
  <h4>Checking Normality</h4>
  <ul>
    <li><strong>Q-Q plot:</strong> Points should fall on diagonal line</li>
    <li><strong>Shapiro-Wilk test:</strong> p > .05 indicates normality</li>
  </ul>
  <div class="jamovi-box">
    <p>Under "Assumption Checks," select <strong>Normality (Q-Q plot)</strong></p>
  </div>

  <h4>If Violated → Use Kruskal-Wallis Test</h4>
  <p><strong>Non-parametric alternative</strong> to one-way ANOVA (works on ranks)</p>
  <div class="jamovi-box">
    <p><strong>Analyses → ANOVA → Non-Parametric → One-Way ANOVA (Kruskal-Wallis)</strong></p>
    <p>Reports χ² statistic instead of F</p>
  </div>

  <h3>3. Independence</h3>
  <p><strong>Assumption:</strong> Observations are independent (knowing one tells you nothing about others)</p>
  <h4>Violations</h4>
  <ul>
    <li><strong>Repeated measures:</strong> Same participants in multiple groups</li>
    <li><strong>Matched pairs/clusters:</strong> Participants are related</li>
  </ul>
  <h4>Solution → Repeated Measures ANOVA</h4>
  <p>Accounts for within-subject correlation</p>

  <div class="key-points-box">
    <h3>Summary of Assumption Checks</h3>
    <table class="stats-table">
      <tr><th>Assumption</th><th>Test</th><th>If Violated</th></tr>
      <tr><td>Equal variance</td><td>Levene's test</td><td>Use Welch's ANOVA</td></tr>
      <tr><td>Normality</td><td>Q-Q plot, Shapiro-Wilk</td><td>Use Kruskal-Wallis</td></tr>
      <tr><td>Independence</td><td>Study design</td><td>Use Repeated Measures ANOVA</td></tr>
    </table>
  </div>

  <div class="warning-box">
    <h3>Important Notes</h3>
    <ul>
      <li>ANOVA is <strong>robust</strong> to mild violations with balanced designs and large N</li>
      <li>Always check assumptions BEFORE interpreting results</li>
      <li>Large N can make tests (Levene, Shapiro-Wilk) overly sensitive — also inspect plots</li>
    </ul>
  </div>
</section>
    `
  },

  // Topic: Repeated Measures ANOVA
  {
    id: 'repeated-measures-anova',
    moduleId: 'module-8',
    chapter: 'chapter-13',
    title: 'Repeated Measures ANOVA',
    description: 'Comparing means when the same participants are in all groups.',
    icon: 'RM',
    contentHtml: `
<section class="module-content" aria-labelledby="rm-anova-title">
  <h2 id="rm-anova-title">13.8 Repeated Measures One-Way ANOVA</h2>

  <div class="concept-box" role="note">
    <h3>What is Repeated Measures ANOVA?</h3>
    <p><strong>Within-subjects design:</strong> Same participants measured in all conditions (or closely matched participants).</p>
    <p><strong>Advantage:</strong> Controls for individual differences → more statistical power</p>
  </div>

  <h3>When to Use Repeated Measures ANOVA</h3>
  <ul>
    <li><strong>Same participants:</strong> Everyone completes all conditions</li>
    <li><strong>3+ conditions:</strong> Comparing means across multiple time points or treatments</li>
    <li><strong>Equal N:</strong> Same number of observations per condition (by design)</li>
  </ul>

  <div class="example-box">
    <h4>Example: Broca's Aphasia</h4>
    <p><strong>Research Question:</strong> Do language task types differ in difficulty for Broca's aphasics?</p>
    <ul>
      <li><strong>N = 6 patients</strong>, each completes 3 tasks</li>
      <li><strong>Tasks:</strong> Speech production, Conceptual comprehension, Syntax</li>
      <li><strong>Outcome:</strong> Number correct (out of 10)</li>
    </ul>
    <table class="stats-table">
      <tr><th>Task</th><th>Mean</th><th>Median</th></tr>
      <tr><td>Speech</td><td>7.17</td><td>7.50</td></tr>
      <tr><td>Conceptual</td><td>6.17</td><td>6.50</td></tr>
      <tr><td>Syntax</td><td>4.33</td><td>4.50</td></tr>
    </table>
  </div>

  <h3>How Repeated Measures ANOVA Works</h3>
  <p>Partitions within-group variance into two parts:</p>
  <div class="formula-box">
    <p><strong>Independent ANOVA:</strong> SS_error = SS_within</p>
    <p><strong>Repeated Measures ANOVA:</strong> SS_error = SS_within - SS_subjects</p>
    <p>By removing <strong>individual differences (SS_subjects)</strong>, error term is smaller → more power</p>
  </div>

  <h3>Sphericity Assumption</h3>
  <p><strong>Sphericity:</strong> Variances of differences between all pairs of conditions are equal</p>
  <h4>Mauchly's Test of Sphericity</h4>
  <ul>
    <li><strong>H₀:</strong> Sphericity holds</li>
    <li><strong>Decision:</strong> If p > .05, assume sphericity</li>
    <li><strong>If violated (p < .05):</strong> Apply correction</li>
  </ul>

  <h4>Corrections for Violated Sphericity</h4>
  <ul>
    <li><strong>Greenhouse-Geisser ε < .75:</strong> Use GG correction</li>
    <li><strong>Greenhouse-Geisser ε > .75:</strong> Use Huynh-Feldt correction</li>
  </ul>

  <div class="jamovi-box">
    <h3>Running Repeated Measures ANOVA in jamovi</h3>
    <ol>
      <li><strong>Analyses → ANOVA → Repeated Measures ANOVA</strong></li>
      <li>Create a <strong>Repeated Measures Factor</strong> (e.g., "Task") with 3 levels: Speech, Conceptual, Syntax</li>
      <li>Move each variable to <strong>Repeated Measures Cells</strong></li>
      <li>Under "Assumption Checks," check <strong>Sphericity tests</strong></li>
      <li>Check <strong>Sphericity Corrections</strong>: Greenhouse-Geisser, Huynh-Feldt</li>
      <li>Add post-hoc tests as needed</li>
    </ol>
  </div>

  <div class="example-box">
    <h4>Results</h4>
    <p><strong>Mauchly's W = 0.85, p = .72</strong> → Sphericity met</p>
    <p><strong>F(2, 10) = 6.93, p = .013, η² = 0.58</strong></p>
    <p><em>Interpretation:</em> Task type significantly affects performance. 58% of variance explained by task.</p>
    <p><strong>Post-hoc (Holm):</strong> Speech > Syntax (p = .01), other comparisons ns</p>
  </div>

  <div class="key-points-box">
    <h3>Key Points</h3>
    <ul>
      <li>Repeated measures ANOVA has <strong>more power</strong> than independent ANOVA</li>
      <li>Requires <strong>sphericity</strong> assumption (use Mauchly's test)</li>
      <li>If sphericity violated, apply <strong>GG or HF correction</strong></li>
      <li>Each participant appears in all conditions (within-subjects)</li>
    </ul>
  </div>

  <div class="warning-box">
    <h3>Friedman Test (Non-Parametric Alternative)</h3>
    <p>If normality violated, use <strong>Friedman test</strong> (like Kruskal-Wallis for repeated measures)</p>
    <p><strong>Analyses → ANOVA → Non-Parametric → Repeated Measures ANOVA</strong></p>
  </div>
</section>
    `
  },

  // ============================================================
  // CHAPTER 10: CATEGORICAL DATA ANALYSIS
  // ============================================================

  // Topic: Chi-Square Goodness-of-Fit Test
  {
    id: 'chi-square-goodness-of-fit',
    moduleId: 'module-8',
    chapter: 'chapter-10',
    title: 'Chi-Square Goodness-of-Fit Test',
    description: 'Testing if observed frequencies match expected probabilities.',
    icon: 'χ²',
    contentHtml: `
<section class="module-content" aria-labelledby="gof-title">
  <h2 id="gof-title">10.1 The χ² Goodness-of-Fit Test</h2>

  <div class="concept-box" role="note">
    <h3>Quick Summary</h3>
    <p>The χ² goodness-of-fit test determines whether an observed frequency distribution matches an expected frequency distribution. It answers: "Do my observed counts fit the pattern I expected?"</p>
  </div>

  <h3>When to Use</h3>
  <ul>
    <li>You have <strong>ONE categorical variable</strong></li>
    <li>You want to test if observed frequencies match specific expected probabilities</li>
    <li>Example: Testing if card suit choices are truly random (equal probabilities)</li>
    <li>Example: Testing if observed genetics ratios match Mendelian predictions</li>
  </ul>

  <h3>The Cards Example</h3>
  <p>You ask 200 people to mentally select a card suit "at random." Here are the results:</p>

  <div class="example-box">
    <table class="stats-table">
      <tr>
        <th>Suit</th>
        <th>Observed (O)</th>
        <th>Expected (E)</th>
      </tr>
      <tr><td>♣ Clubs</td><td>35</td><td>50</td></tr>
      <tr><td>♦ Diamonds</td><td>51</td><td>50</td></tr>
      <tr><td>♥ Hearts</td><td>64</td><td>50</td></tr>
      <tr><td>♠ Spades</td><td>50</td><td>50</td></tr>
      <tr><th>Total</th><th>200</th><th>200</th></tr>
    </table>
    <p><strong>Question:</strong> Are people truly choosing randomly, or do they favor certain suits?</p>
  </div>

  <h3>Hypotheses</h3>
  <div class="formula-box">
    <p><strong>H₀:</strong> All four suits are chosen with equal probability (P = (.25, .25, .25, .25))</p>
    <p><strong>H₁:</strong> At least one suit probability ≠ 0.25</p>
  </div>

  <h3>The Test Statistic</h3>
  <div class="formula-box">
    <h4>Chi-Square Statistic:</h4>
    <p><strong>χ² = Σ [(O<sub>i</sub> - E<sub>i</sub>)² / E<sub>i</sub>]</strong></p>

    <h4>Where:</h4>
    <ul>
      <li>O<sub>i</sub> = observed frequency in category i</li>
      <li>E<sub>i</sub> = expected frequency in category i</li>
      <li>E<sub>i</sub> = N × P<sub>i</sub> (sample size × probability)</li>
      <li>Sum across all categories</li>
    </ul>
  </div>

  <h3>Step-by-Step Calculation</h3>
  <div class="example-box">
    <h4>Cards Example</h4>
    <p><strong>Step 1: Calculate expected frequencies</strong></p>
    <p>E<sub>i</sub> = N × P<sub>i</sub> = 200 × 0.25 = 50 for each suit</p>

    <p><strong>Step 2: Calculate (O - E)² / E for each category</strong></p>
    <ul>
      <li>Clubs: (35-50)²/50 = 225/50 = 4.50</li>
      <li>Diamonds: (51-50)²/50 = 1/50 = 0.02</li>
      <li>Hearts: (64-50)²/50 = 196/50 = 3.92</li>
      <li>Spades: (50-50)²/50 = 0/50 = 0.00</li>
    </ul>

    <p><strong>Step 3: Sum to get χ²</strong></p>
    <p>χ² = 4.50 + 0.02 + 3.92 + 0.00 = <strong>8.44</strong></p>

    <p><strong>Step 4: Degrees of freedom</strong></p>
    <p>df = k - 1 = 4 - 1 = <strong>3</strong></p>
    <p>(Where k = number of categories)</p>

    <p><strong>Step 5: Compare to critical value</strong></p>
    <p>Critical value (α = .05, df = 3) = 7.815</p>
    <p>Since χ² = 8.44 > 7.815, we <strong>reject H₀</strong></p>
    <p>Or: p-value = .038 < .05</p>

    <p><strong>Conclusion:</strong> People do not choose card suits randomly (χ²(3) = 8.44, p = .038). They show a preference for hearts and avoid clubs.</p>
  </div>

  <h3>Degrees of Freedom</h3>
  <div class="concept-box">
    <h4>Why df = k - 1?</h4>
    <p>With k categories, once you know k-1 of the frequencies (and the total N), the last frequency is determined—it's not "free to vary."</p>
    <p><strong>Example:</strong> If you know 3 suits have frequencies 35, 51, and 64, and N=200, then the 4th must be 200 - (35+51+64) = 50. Only 3 frequencies are independent.</p>
  </div>

  <h3>Custom Expected Proportions</h3>
  <p>You don't have to test equal probabilities. For example, testing if people prefer red cards (60%) over black (40%):</p>
  <div class="formula-box">
    <p><strong>H₀:</strong> P(♥) = .30, P(♦) = .30, P(♣) = .20, P(♠) = .20</p>
  </div>

  <div class="jamovi-box">
    <h3>In jamovi</h3>
    <ol>
      <li><strong>Analyses → Frequencies → One Sample Proportion Tests → N Outcomes</strong></li>
      <li>Add your categorical variable</li>
      <li>Check <strong>"Expected counts"</strong> to see E<sub>i</sub> values</li>
      <li>To specify custom proportions: Expand <strong>"Expected Proportions"</strong> and enter ratios</li>
    </ol>
  </div>

  <div class="key-points">
    <h3>Key Points</h3>
    <ul>
      <li>Tests if <strong>observed frequencies</strong> match <strong>expected probabilities</strong></li>
      <li>Use for <strong>one categorical variable</strong></li>
      <li>df = k - 1 (number of categories minus 1)</li>
      <li>Large χ² → observed differs from expected → reject H₀</li>
      <li>Small χ² → observed close to expected → retain H₀</li>
      <li>Always a <strong>one-sided test</strong> (right tail only)</li>
    </ul>
  </div>

  <div class="warning-box">
    <h3>Assumptions</h3>
    <ul>
      <li><strong>Expected frequencies ≥ 5</strong> for all categories (or at least ≥ 1 with most ≥ 5)</li>
      <li><strong>Independent observations</strong> (each person counted once)</li>
      <li>Data are actual counts, not percentages or proportions</li>
    </ul>
  </div>
</section>
    `
  },

  // Topic: Chi-Square Test of Independence
  {
    id: 'chi-square-independence',
    moduleId: 'module-8',
    chapter: 'chapter-10',
    title: 'Chi-Square Test of Independence',
    description: 'Testing association between two categorical variables.',
    icon: 'χ²',
    contentHtml: `
<section class="module-content" aria-labelledby="independence-title">
  <h2 id="independence-title">10.2 The χ² Test of Independence</h2>

  <div class="concept-box" role="note">
    <h3>Quick Summary</h3>
    <p>The χ² test of independence determines whether two categorical variables are associated. It answers: "Does the distribution of Variable A depend on the value of Variable B?"</p>
  </div>

  <h3>When to Use</h3>
  <ul>
    <li>You have <strong>TWO categorical variables</strong></li>
    <li>You want to test if they are associated/related</li>
    <li>Data organized in a <strong>contingency table</strong></li>
    <li>Example: Is species (robot/human) associated with preference (puppy/flower/data)?</li>
  </ul>

  <h3>The Chapek 9 Example</h3>
  <div class="example-box">
    <p>Robots and humans were asked their preference. Are species and choice independent?</p>
    <table class="stats-table">
      <tr>
        <th></th>
        <th>Robot</th>
        <th>Human</th>
        <th>Total</th>
      </tr>
      <tr><td><strong>Puppy</strong></td><td>13</td><td>15</td><td>28</td></tr>
      <tr><td><strong>Flower</strong></td><td>30</td><td>13</td><td>43</td></tr>
      <tr><td><strong>Data</strong></td><td>44</td><td>65</td><td>109</td></tr>
      <tr><th>Total</th><th>87</th><th>93</th><th>180</th></tr>
    </table>
  </div>

  <h3>Hypotheses</h3>
  <div class="formula-box">
    <p><strong>H₀:</strong> Species and choice are independent (no association)</p>
    <p><strong>H₁:</strong> Species and choice are associated (related)</p>

    <p><em>Equivalently:</em></p>
    <p><strong>H₀:</strong> P(choice | robot) = P(choice | human) for all choices</p>
    <p><strong>H₁:</strong> At least one choice probability differs by species</p>
  </div>

  <h3>Expected Frequencies</h3>
  <p>Under independence, expected frequency for cell (row i, column j) is:</p>
  <div class="formula-box">
    <p><strong>E<sub>ij</sub> = (Row<sub>i</sub> Total × Column<sub>j</sub> Total) / N</strong></p>
  </div>

  <div class="example-box">
    <h4>Calculating E for Robot-Puppy cell:</h4>
    <p>E = (28 × 87) / 180 = 2436 / 180 = 13.53</p>

    <h4>All expected frequencies:</h4>
    <table class="stats-table">
      <tr><th></th><th>Robot</th><th>Human</th></tr>
      <tr><td>Puppy</td><td>13.53</td><td>14.47</td></tr>
      <tr><td>Flower</td><td>20.78</td><td>22.22</td></tr>
      <tr><td>Data</td><td>52.69</td><td>56.31</td></tr>
    </table>
  </div>

  <h3>The Test Statistic</h3>
  <div class="formula-box">
    <p><strong>χ² = Σ Σ [(O<sub>ij</sub> - E<sub>ij</sub>)² / E<sub>ij</sub>]</strong></p>
    <p>Sum over all rows (i) and columns (j)</p>
  </div>

  <div class="example-box">
    <h4>Calculation:</h4>
    <p>χ² = (13-13.53)²/13.53 + (15-14.47)²/14.47 + ... [for all 6 cells]</p>
    <p>χ² = 0.02 + 0.02 + 4.09 + 3.83 + 1.43 + 1.34 = <strong>10.72</strong></p>

    <p><strong>Degrees of freedom:</strong></p>
    <p>df = (r - 1)(c - 1) = (3 - 1)(2 - 1) = 2 × 1 = <strong>2</strong></p>

    <p><strong>Result:</strong></p>
    <p>χ²(2) = 10.72, p = .005</p>
    <p>Since p < .05, <strong>reject H₀</strong></p>

    <p><strong>Conclusion:</strong> There is a significant association between species and choice (χ²(2) = 10.72, p = .005). Robots prefer flowers more than humans, while humans prefer data files.</p>
  </div>

  <h3>Degrees of Freedom for r × c Tables</h3>
  <div class="concept-box">
    <h4>Why df = (r-1)(c-1)?</h4>
    <p>Once you know:</p>
    <ul>
      <li>All row totals (r constraints)</li>
      <li>All column totals (c constraints)</li>
      <li>The grand total (1 constraint)</li>
    </ul>
    <p>Only (r-1)(c-1) cells are "free to vary." The rest are determined.</p>

    <p><strong>Example (2×2 table):</strong> If you know 1 cell value + all margins, you can calculate the other 3 cells. So df = (2-1)(2-1) = 1.</p>
  </div>

  <div class="jamovi-box">
    <h3>In jamovi</h3>
    <ol>
      <li><strong>Analyses → Frequencies → Contingency Tables → Independent Samples</strong></li>
      <li>Move one variable to <strong>Rows</strong></li>
      <li>Move other variable to <strong>Columns</strong></li>
      <li>Under <strong>Statistics</strong>: χ² is shown by default</li>
      <li>Under <strong>Cells</strong>: Check <strong>"Expected counts"</strong> to see E<sub>ij</sub></li>
      <li>Under <strong>Statistics</strong>: Check <strong>"Cramér's V"</strong> for effect size</li>
    </ol>
  </div>

  <h3>Writing Up Results</h3>
  <div class="example-box">
    <p><em>"Pearson's χ² revealed a significant association between species and choice (χ²(2) = 10.7, p < .01, Cramér's V = 0.24). Robots were more likely to choose flowers, whereas humans preferred data files."</em></p>
  </div>

  <div class="key-points">
    <h3>Key Points</h3>
    <ul>
      <li>Tests <strong>association between two categorical variables</strong></li>
      <li>Data in <strong>contingency table</strong> (cross-tabulation)</li>
      <li>df = (rows - 1)(columns - 1)</li>
      <li>Expected frequencies: E<sub>ij</sub> = (Row Total × Col Total) / N</li>
      <li>Always report <strong>effect size</strong> (Cramér's V)</li>
      <li>Describe the <strong>pattern</strong> of association, not just significance</li>
    </ul>
  </div>

  <div class="warning-box">
    <h3>Common Mistakes</h3>
    <ul>
      <li><strong>Using percentages instead of counts:</strong> χ² requires actual frequencies</li>
      <li><strong>Not checking expected frequencies:</strong> All E<sub>ij</sub> should be ≥ 5</li>
      <li><strong>Confusing independence with goodness-of-fit:</strong> Independence = 2 variables, GOF = 1 variable</li>
      <li><strong>Only reporting χ² and p:</strong> Always describe the pattern of association</li>
    </ul>
  </div>
</section>
    `
  },

  // Topic: Continuity Correction and Effect Size
  {
    id: 'chi-square-corrections-effect-size',
    moduleId: 'module-8',
    chapter: 'chapter-10',
    title: 'Continuity Correction & Effect Size',
    description: 'Yates correction for 2×2 tables and measuring association strength.',
    icon: 'V',
    contentHtml: `
<section class="module-content" aria-labelledby="corrections-title">
  <h2 id="corrections-title">10.3-10.4 Continuity Correction and Effect Size</h2>

  <div class="concept-box" role="note">
    <h3>Part 1: The Continuity Correction (Yates Correction)</h3>
    <p>When df = 1 (e.g., 2×2 tables or 2-category goodness-of-fit), the χ² approximation can be too liberal. The Yates correction makes the test more conservative.</p>
  </div>

  <h3>When to Use Continuity Correction</h3>
  <ul>
    <li><strong>Only when df = 1</strong> (2×2 contingency tables, or 2-category GOF)</li>
    <li>Small to moderate sample sizes (N < 100)</li>
    <li>When expected frequencies are close to 5 (but not below 5)</li>
  </ul>

  <h3>The Formula</h3>
  <div class="formula-box">
    <h4>Without Correction:</h4>
    <p>χ² = Σ [(O - E)² / E]</p>

    <h4>With Yates Correction:</h4>
    <p>χ² = Σ [(|O - E| - 0.5)² / E]</p>
    <p><em>Subtract 0.5 from the absolute difference before squaring</em></p>
  </div>

  <div class="example-box">
    <h4>Example: 2×2 Table</h4>
    <table class="stats-table">
      <tr><th></th><th>Yes</th><th>No</th></tr>
      <tr><td>Treatment</td><td>O=30</td><td>O=20</td></tr>
      <tr><td>Control</td><td>O=15</td><td>O=35</td></tr>
    </table>

    <p><strong>Expected frequencies:</strong> All ≈ 22.5 or 27.5</p>

    <p><strong>Without correction:</strong> χ² = 9.10, p = .003</p>
    <p><strong>With correction:</strong> χ² = 7.98, p = .005</p>
    <p><em>Correction reduces χ² slightly, making test more conservative</em></p>
  </div>

  <div class="jamovi-box">
    <h3>In jamovi</h3>
    <p>In Contingency Tables → Statistics → Check <strong>"χ² continuity correction"</strong></p>
    <p>jamovi will show both the standard χ² and the corrected value.</p>
  </div>

  <div class="concept-box" style="margin-top: 2em;">
    <h3>Part 2: Effect Size (Cramér's V)</h3>
    <p>A significant χ² tells you there IS an association, but not how STRONG it is. Effect size quantifies the strength of association.</p>
  </div>

  <h3>Why Effect Size Matters</h3>
  <ul>
    <li>p-values depend on sample size</li>
    <li>With N=10,000, even tiny associations are "significant"</li>
    <li>Effect size is independent of sample size</li>
    <li>Tells you practical importance, not just statistical significance</li>
  </ul>

  <h3>Cramér's V Formula</h3>
  <div class="formula-box">
    <h4>For any size contingency table:</h4>
    <p><strong>V = √[χ² / (N × (k - 1))]</strong></p>

    <h4>Where:</h4>
    <ul>
      <li>χ² = chi-square statistic</li>
      <li>N = total sample size</li>
      <li>k = min(rows, columns)</li>
    </ul>

    <h4>Simpler formula (phi) for 2×2 tables:</h4>
    <p><strong>φ = √(χ² / N)</strong></p>
    <p><em>For 2×2, Cramér's V = φ</em></p>
  </div>

  <h3>Interpreting Cramér's V</h3>
  <div class="formula-box">
    <h4>Cohen's Benchmarks (for df = 1, i.e., 2×2 tables):</h4>
    <ul>
      <li><strong>Small:</strong> V ≈ 0.10</li>
      <li><strong>Medium:</strong> V ≈ 0.30</li>
      <li><strong>Large:</strong> V ≈ 0.50</li>
    </ul>

    <p><em>For larger tables (df > 1), these benchmarks should be adjusted upward slightly</em></p>
  </div>

  <div class="example-box">
    <h4>Chapek 9 Example:</h4>
    <p>χ²(2) = 10.72, N = 180</p>
    <p>k = min(3, 2) = 2</p>
    <p>V = √[10.72 / (180 × (2-1))] = √[10.72 / 180] = √0.0596 = <strong>0.24</strong></p>

    <p><strong>Interpretation:</strong> The association between species and choice is small-to-medium in strength. About 24% of the maximum possible association.</p>
  </div>

  <div class="jamovi-box">
    <h3>In jamovi</h3>
    <p>In Contingency Tables → Statistics → Check <strong>"Cramér's V"</strong></p>
  </div>

  <h3>Other Effect Size Measures</h3>
  <div class="concept-box">
    <h4>Alternatives to Cramér's V:</h4>
    <ul>
      <li><strong>Phi (φ):</strong> For 2×2 tables only (same as Cramér's V when 2×2)</li>
      <li><strong>Odds Ratio:</strong> For 2×2 tables, compares odds of outcome in two groups</li>
      <li><strong>Risk Ratio:</strong> For 2×2 tables, compares risk of outcome</li>
    </ul>
    <p>Cramér's V is most general—works for any size table.</p>
  </div>

  <div class="key-points">
    <h3>Key Points</h3>
    <ul>
      <li><strong>Continuity correction:</strong> Use for df = 1, makes test more conservative</li>
      <li><strong>Cramér's V:</strong> Standard effect size for chi-square tests</li>
      <li>V ranges from <strong>0 (no association) to 1 (perfect association)</strong></li>
      <li>Always report effect size along with χ² and p-value</li>
      <li>Effect size tells you <strong>practical importance</strong></li>
      <li>Small p-value doesn't mean large effect—especially with big N</li>
    </ul>
  </div>

  <div class="example-box">
    <h4>Complete Write-Up Template:</h4>
    <p><em>"A chi-square test of independence revealed a significant association between [Variable A] and [Variable B], χ²(df) = X.XX, p = .XXX, Cramér's V = 0.XX. [Describe pattern of association]."</em></p>

    <p><strong>Example:</strong></p>
    <p><em>"A chi-square test of independence revealed a significant association between species and preference, χ²(2) = 10.72, p = .005, Cramér's V = 0.24. Robots showed a stronger preference for flowers (34%) compared to humans (14%), while humans were more likely to choose data files (70% vs 51%)."</em></p>
  </div>
</section>
    `
  },

  // Topic: Assumptions and Fisher Exact Test
  {
    id: 'chi-square-assumptions-fisher',
    moduleId: 'module-8',
    chapter: 'chapter-10',
    title: 'Assumptions & Fisher Exact Test',
    description: 'Checking assumptions and handling small expected frequencies.',
    icon: 'F',
    contentHtml: `
<section class="module-content" aria-labelledby="assumptions-title">
  <h2 id="assumptions-title">10.5-10.6 Assumptions and the Fisher Exact Test</h2>

  <div class="concept-box" role="note">
    <h3>Part 1: Assumptions of Chi-Square Tests</h3>
    <p>Chi-square tests are based on approximations that work well when certain conditions are met. Violating assumptions can lead to incorrect conclusions.</p>
  </div>

  <h3>Assumption 1: Expected Frequencies Are Large Enough</h3>

  <div class="formula-box">
    <h4>Rules of Thumb:</h4>
    <ul>
      <li><strong>Strict rule:</strong> All expected frequencies ≥ 5</li>
      <li><strong>Lenient rule:</strong> At least 80% of cells have E ≥ 5, and no cell has E < 1</li>
      <li><strong>For 2×2 tables:</strong> All four E<sub>ij</sub> ≥ 5 (strict)</li>
    </ul>
  </div>

  <div class="warning-box">
    <h3>Why This Matters</h3>
    <p>χ² uses a continuous distribution to approximate discrete count data. This approximation breaks down when expected counts are small:</p>
    <ul>
      <li>Test becomes too <strong>liberal</strong> (Type I error rate > α)</li>
      <li>p-values are too small</li>
      <li>May falsely reject true null hypothesis</li>
    </ul>
  </div>

  <div class="example-box">
    <h4>Checking in jamovi:</h4>
    <ol>
      <li>Run contingency table analysis</li>
      <li>Check <strong>"Expected counts"</strong> under Cells</li>
      <li>Examine all E<sub>ij</sub> values</li>
      <li>If any are < 5, consider Fisher exact test</li>
    </ol>
  </div>

  <h3>What to Do If Expected Frequencies Are Too Small</h3>
  <div class="concept-box">
    <h4>Options:</h4>
    <ol>
      <li><strong>Collect more data</strong> (if possible)</li>
      <li><strong>Combine categories</strong> (if theoretically justified)</li>
      <li><strong>Use Fisher exact test</strong> (for 2×2 tables)</li>
      <li><strong>Use simulation-based methods</strong> (advanced)</li>
    </ol>
  </div>

  <h3>Assumption 2: Independence of Observations</h3>
  <ul>
    <li>Each observation counted exactly <strong>once</strong></li>
    <li>Observations from different participants (or units)</li>
    <li>No repeated measures from same person</li>
  </ul>

  <div class="warning-box">
    <h3>Violations of Independence</h3>
    <p><strong>Problem:</strong> Measuring the same people twice (e.g., before/after)</p>
    <p><strong>Solution:</strong> Use <strong>McNemar test</strong> instead of χ² independence test</p>

    <p><strong>Example of violation:</strong> You walk through a maternity ward 10 times, seeing the same 3 babies each time. You have 30 observations but only 3 independent babies!</p>
  </div>

  <div class="concept-box" style="margin-top: 2em;">
    <h3>Part 2: Fisher's Exact Test</h3>
    <p>When expected frequencies are too small for χ² test, Fisher's exact test provides the exact p-value using the hypergeometric distribution.</p>
  </div>

  <h3>When to Use Fisher's Exact Test</h3>
  <ul>
    <li><strong>2×2 contingency tables</strong> only (standard version)</li>
    <li>Expected frequencies < 5 in one or more cells</li>
    <li>Small sample sizes</li>
    <li>When you need exact p-values (not approximations)</li>
  </ul>

  <h3>The Salem Witches Example</h3>
  <div class="example-box">
    <p>Testing emotional status of people accused of witchcraft:</p>
    <table class="stats-table">
      <tr><th></th><th>On Fire</th><th>Not On Fire</th></tr>
      <tr><td>Happy</td><td>0</td><td>10</td></tr>
      <tr><td>Unhappy</td><td>3</td><td>3</td></tr>
    </table>

    <p><strong>Expected frequencies:</strong></p>
    <table class="stats-table">
      <tr><th></th><th>On Fire</th><th>Not On Fire</th></tr>
      <tr><td>Happy</td><td>1.88</td><td>8.13</td></tr>
      <tr><td>Unhappy</td><td>1.13</td><td>4.88</td></tr>
    </table>

    <p><strong>Problem:</strong> Two cells have E < 5, so χ² may not be appropriate</p>
    <p><strong>Solution:</strong> Use Fisher exact test</p>
    <p><strong>Result:</strong> p = .036 (exact)</p>
    <p><strong>Conclusion:</strong> People on fire are significantly less happy (p = .036)</p>
  </div>

  <h3>How Fisher's Exact Test Works</h3>
  <div class="concept-box">
    <h4>Logic:</h4>
    <p>Treats row and column totals as <strong>fixed</strong>. Then calculates:</p>
    <ul>
      <li>Probability of observing this exact table</li>
      <li>Probability of all more extreme tables</li>
      <li>Sums these probabilities = exact p-value</li>
    </ul>
    <p>Uses hypergeometric distribution (drawing without replacement)</p>
    <p><em>No approximation—calculates exact probability</em></p>
  </div>

  <div class="jamovi-box">
    <h3>In jamovi</h3>
    <ol>
      <li><strong>Analyses → Frequencies → Contingency Tables → Independent Samples</strong></li>
      <li>Set up your 2×2 table</li>
      <li>Under <strong>Statistics</strong>, check <strong>"Fisher's exact test"</strong></li>
      <li>jamovi shows both χ² and Fisher exact p-value</li>
      <li>Use Fisher's p-value when expected frequencies are small</li>
    </ol>
  </div>

  <h3>Fisher vs. Chi-Square</h3>
  <div class="formula-box">
    <table class="stats-table">
      <tr>
        <th></th>
        <th>Chi-Square</th>
        <th>Fisher Exact</th>
      </tr>
      <tr>
        <td><strong>Table size</strong></td>
        <td>Any size</td>
        <td>2×2 only (standard)</td>
      </tr>
      <tr>
        <td><strong>Expected freq</strong></td>
        <td>All ≥ 5</td>
        <td>Can be < 5</td>
      </tr>
      <tr>
        <td><strong>P-value</strong></td>
        <td>Approximate</td>
        <td>Exact</td>
      </tr>
      <tr>
        <td><strong>Computation</strong></td>
        <td>Fast</td>
        <td>Slower (but still instant for small N)</td>
      </tr>
      <tr>
        <td><strong>When to use</strong></td>
        <td>Large samples, E ≥ 5</td>
        <td>Small samples, E < 5</td>
      </tr>
    </table>
  </div>

  <div class="key-points">
    <h3>Key Points</h3>
    <ul>
      <li><strong>Check assumptions</strong> before trusting χ² results</li>
      <li><strong>Expected frequencies ≥ 5:</strong> Critical for valid results</li>
      <li><strong>Independence:</strong> Each observation counted once</li>
      <li><strong>Fisher exact test:</strong> Use when expected frequencies are small</li>
      <li>Fisher gives <strong>exact p-values</strong>, not approximations</li>
      <li>If assumptions violated, results may be completely wrong</li>
    </ul>
  </div>

  <div class="warning-box">
    <h3>Common Mistakes</h3>
    <ul>
      <li><strong>Checking observed instead of expected:</strong> It's E<sub>ij</sub> that must be ≥ 5, not O<sub>ij</sub></li>
      <li><strong>Using χ² with paired data:</strong> Use McNemar test instead</li>
      <li><strong>Automatically deleting small cells:</strong> Use Fisher exact instead</li>
      <li><strong>Not reporting which test was used:</strong> Always state if you used Fisher's</li>
    </ul>
  </div>
</section>
    `
  },

  // Topic: McNemar Test
  {
    id: 'mcnemar-test',
    moduleId: 'module-8',
    chapter: 'chapter-10',
    title: 'McNemar Test for Paired Data',
    description: 'Testing categorical data from repeated measures or matched pairs.',
    icon: 'M',
    contentHtml: `
<section class="module-content" aria-labelledby="mcnemar-title">
  <h2 id="mcnemar-title">10.7 The McNemar Test</h2>

  <div class="concept-box" role="note">
    <h3>Quick Summary</h3>
    <p>The McNemar test is for categorical data when the <strong>same participants are measured twice</strong> (or participants are matched in pairs). It tests for "marginal homogeneity"—whether the proportions changed from Time 1 to Time 2.</p>
  </div>

  <h3>When to Use McNemar Test</h3>
  <ul>
    <li><strong>Same participants measured twice</strong> (before/after, pre/post)</li>
    <li><strong>Matched pairs</strong> of participants</li>
    <li><strong>2×2 table</strong> where rows and columns represent same categories</li>
    <li>Example: Did political ad change voting intentions?</li>
    <li>Example: Do couples agree on yes/no question?</li>
  </ul>

  <div class="warning-box">
    <h3>Why Not Chi-Square Independence?</h3>
    <p><strong>Problem:</strong> Same people measured twice violates independence assumption</p>
    <p><strong>Consequence:</strong> Standard χ² test gives wrong p-values</p>
    <p><strong>Solution:</strong> McNemar test accounts for the pairing</p>
  </div>

  <h3>The Political Ad Example</h3>
  <div class="example-box">
    <p>You show 100 people a political ad. Before and after, you ask: "Will you vote for AGPP?"</p>

    <h4>Standard contingency table (WRONG for this data):</h4>
    <table class="stats-table">
      <tr><th></th><th>Before: Yes</th><th>Before: No</th></tr>
      <tr><td>After: Yes</td><td>30</td><td>70</td></tr>
      <tr><td>After: No</td><td>10</td><td>90</td></tr>
    </table>
    <p><em>This looks like 200 observations, but it's really 100 people measured twice!</em></p>

    <h4>Correct format for McNemar (same data):</h4>
    <table class="stats-table">
      <tr><th></th><th>Before: Yes</th><th>Before: No</th><th>Total</th></tr>
      <tr><td>After: Yes</td><td>5</td><td>5</td><td>10</td></tr>
      <tr><td>After: No</td><td>25</td><td>65</td><td>90</td></tr>
      <tr><th>Total</th><th>30</th><th>70</th><th>100</th></tr>
    </table>
    <p><em>Now each of the 100 people appears in exactly one cell</em></p>
  </div>

  <h3>Understanding the Table</h3>
  <div class="formula-box">
    <h4>The four cells represent:</h4>
    <table class="stats-table">
      <tr><th></th><th>Before: Yes</th><th>Before: No</th></tr>
      <tr><td>After: Yes</td><td><strong>a</strong> = stayed Yes (5)</td><td><strong>b</strong> = changed No→Yes (5)</td></tr>
      <tr><td>After: No</td><td><strong>c</strong> = changed Yes→No (25)</td><td><strong>d</strong> = stayed No (65)</td></tr>
    </table>

    <h4>The key insight:</h4>
    <ul>
      <li>Cells <strong>a</strong> and <strong>d</strong>: People who didn't change—not informative for "did opinions change?"</li>
      <li>Cells <strong>b</strong> and <strong>c</strong>: People who DID change—this is what we test!</li>
    </ul>
  </div>

  <h3>The McNemar Test Statistic</h3>
  <div class="formula-box">
    <h4>Basic formula:</h4>
    <p><strong>χ² = (b - c)² / (b + c)</strong></p>

    <h4>With continuity correction (recommended for df=1):</h4>
    <p><strong>χ² = (|b - c| - 0.5)² / (b + c)</strong></p>

    <h4>Where:</h4>
    <ul>
      <li>b = number who changed from No to Yes</li>
      <li>c = number who changed from Yes to No</li>
      <li>df = 1 (always, for 2×2 McNemar)</li>
    </ul>
  </div>

  <div class="concept-box">
    <h3>The Null Hypothesis</h3>
    <p><strong>H₀:</strong> P(change from Yes to No) = P(change from No to Yes)</p>
    <p><em>Or equivalently: Marginal proportions are the same at both time points</em></p>

    <p><strong>H₁:</strong> P(Yes→No) ≠ P(No→Yes)</p>
    <p><em>Proportions differ across time points</em></p>
  </div>

  <div class="example-box">
    <h4>Calculating the Test Statistic:</h4>
    <p>From our political ad example:</p>
    <ul>
      <li>b = 5 (changed No → Yes)</li>
      <li>c = 25 (changed Yes → No)</li>
    </ul>

    <p><strong>Without correction:</strong></p>
    <p>χ² = (5 - 25)² / (5 + 25) = 400 / 30 = 13.33</p>

    <p><strong>With continuity correction:</strong></p>
    <p>χ² = (|5 - 25| - 0.5)² / 30 = (19.5)² / 30 = 380.25 / 30 = 12.68</p>

    <p><strong>Critical value:</strong> χ²(1, α=.05) = 3.84</p>
    <p>Since 12.68 > 3.84, <strong>reject H₀</strong></p>

    <p><strong>Result:</strong> χ²(1) = 12.03, p < .001 (from jamovi)</p>

    <p><strong>Conclusion:</strong> The ad significantly changed voting intentions (χ²(1) = 12.03, p < .001). More people switched from Yes to No (25) than from No to Yes (5), suggesting the ad had a negative effect.</p>
  </div>

  <div class="jamovi-box">
    <h3>In jamovi</h3>
    <ol>
      <li><strong>Analyses → Frequencies → Contingency Tables → Paired Samples</strong></li>
      <li>Move <strong>Before</strong> variable to Rows</li>
      <li>Move <strong>After</strong> variable to Columns</li>
      <li>Under <strong>Statistics</strong>, check <strong>"McNemar"</strong> (usually checked by default)</li>
      <li>Examine the table to see the pattern of change</li>
    </ol>

    <p><strong>Note:</strong> Your data should have each person in one row, with separate columns for Before and After responses.</p>
  </div>

  <h3>McNemar vs. Chi-Square Independence</h3>
  <div class="formula-box">
    <table class="stats-table">
      <tr>
        <th></th>
        <th>McNemar</th>
        <th>Chi-Square Independence</th>
      </tr>
      <tr>
        <td><strong>Design</strong></td>
        <td>Same people twice / Matched pairs</td>
        <td>Different people in each group</td>
      </tr>
      <tr>
        <td><strong>Independence</strong></td>
        <td>Observations NOT independent</td>
        <td>Observations ARE independent</td>
      </tr>
      <tr>
        <td><strong>Question</strong></td>
        <td>"Did proportions CHANGE?"</td>
        <td>"Are variables ASSOCIATED?"</td>
      </tr>
      <tr>
        <td><strong>Focus</strong></td>
        <td>Off-diagonal cells (b, c)</td>
        <td>All cells</td>
      </tr>
      <tr>
        <td><strong>Example</strong></td>
        <td>Before/after treatment</td>
        <td>Treatment vs. control (different people)</td>
      </tr>
    </table>
  </div>

  <h3>Decision Rule</h3>
  <div class="concept-box">
    <h4>Use McNemar when:</h4>
    <ul>
      <li>✓ Same participants measured at two time points</li>
      <li>✓ Matched pairs (twins, couples, etc.)</li>
      <li>✓ 2×2 table with same categories for rows and columns</li>
      <li>✓ Interested in <strong>change over time</strong></li>
    </ul>

    <h4>Use Chi-Square Independence when:</h4>
    <ul>
      <li>✓ Different participants in each cell</li>
      <li>✓ Cross-sectional data (one time point)</li>
      <li>✓ Testing <strong>association between two variables</strong></li>
    </ul>
  </div>

  <div class="key-points">
    <h3>Key Points</h3>
    <ul>
      <li>McNemar tests for <strong>change in proportions</strong> for paired data</li>
      <li>Only uses <strong>off-diagonal cells</strong> (b and c)</li>
      <li>Always <strong>df = 1</strong> for 2×2 tables</li>
      <li>Tests if P(Yes→No) = P(No→Yes) under H₀</li>
      <li><strong>Never use standard χ² for paired data!</strong></li>
      <li>Continuity correction recommended (since df = 1)</li>
    </ul>
  </div>

  <div class="warning-box">
    <h3>Common Mistakes</h3>
    <ul>
      <li><strong>Using χ² independence instead of McNemar:</strong> Violates independence assumption</li>
      <li><strong>Wrong data format:</strong> Need each person in one row with Before/After columns</li>
      <li><strong>Interpreting like correlation:</strong> McNemar tests change, not association strength</li>
      <li><strong>Not describing direction of change:</strong> Always report which direction dominated</li>
    </ul>
  </div>

  <div class="example-box">
    <h4>Write-Up Template:</h4>
    <p><em>"A McNemar test was conducted to determine if [proportion/preference] changed from [Time 1] to [Time 2]. The test was significant, χ²(1) = X.XX, p = .XXX. More participants changed from [A to B] (n=XX) than from [B to A] (n=XX), suggesting [interpretation of direction]."</em></p>
  </div>
</section>
    `
  },

  // ============================================================
  // CHAPTER 11: COMPARING TWO MEANS (T-TESTS)
  // ============================================================

  // Topic: One-Sample Z-Test
  {
    id: 'one-sample-z-test',
    moduleId: 'module-8',
    chapter: 'chapter-11',
    title: 'One-Sample Z-Test',
    description: 'Testing a sample mean against a known population (σ known).',
    icon: 'z',
    contentHtml: `
<section class="module-content" aria-labelledby="z-test-title">
  <h2 id="z-test-title">11.1 The One-Sample Z-Test</h2>

  <div class="concept-box" role="note">
    <h3>Quick Summary</h3>
    <p>The z-test is rarely used in practice because it requires knowing the true population standard deviation. It's primarily taught as a stepping stone to understanding the t-test.</p>
  </div>

  <h3>The Inference Problem</h3>
  <p>Suppose we want to know if a sample mean X̄ is significantly different from a hypothesized population mean μ₀. If we know the true population standard deviation σ, we can use the z-test.</p>

  <h4>Example</h4>
  <p>Dr. Zeppo grades on a curve with μ = 67.5 and σ = 9.5. Do psychology students (n=20, X̄=72.3) score differently?</p>

  <h3>Constructing the Hypothesis Test</h3>

  <div class="formula-box">
    <h4>Hypotheses:</h4>
    <p>H₀: μ = 67.5 (psychology students same as others)</p>
    <p>H₁: μ ≠ 67.5 (psychology students different)</p>
  </div>

  <h3>The Test Statistic</h3>

  <p>The z-statistic standardizes the difference between the sample mean and hypothesized mean:</p>

  <div class="formula-box">
    <h4>Z-Statistic Formula:</h4>
    <p>z = (X̄ - μ₀) / SE(X̄)</p>
    <p>z = (X̄ - μ₀) / (σ/√N)</p>

    <h4>Where:</h4>
    <ul>
      <li>X̄ = sample mean</li>
      <li>μ₀ = hypothesized population mean</li>
      <li>σ = known population standard deviation</li>
      <li>N = sample size</li>
      <li>SE(X̄) = σ/√N = standard error of the mean</li>
    </ul>
  </div>

  <h3>Sampling Distribution</h3>
  <p>Under the null hypothesis, z follows a standard normal distribution: z ~ Normal(0,1)</p>

  <div class="example-box">
    <h4>Critical Values (Two-Tailed Test)</h4>
    <table class="stats-table">
      <tr><th>α level</th><th>Critical z</th></tr>
      <tr><td>0.10</td><td>±1.64</td></tr>
      <tr><td>0.05</td><td>±1.96</td></tr>
      <tr><td>0.01</td><td>±2.58</td></tr>
      <tr><td>0.001</td><td>±3.29</td></tr>
    </table>
  </div>

  <h3>Worked Example</h3>

  <div class="example-box">
    <h4>Psychology Students' Grades</h4>
    <p><strong>Given:</strong></p>
    <ul>
      <li>Sample mean: X̄ = 72.3</li>
      <li>Hypothesized mean: μ₀ = 67.5</li>
      <li>Population SD: σ = 9.5</li>
      <li>Sample size: N = 20</li>
    </ul>

    <p><strong>Step 1: Calculate standard error</strong></p>
    <p>SE = σ/√N = 9.5/√20 = 9.5/4.47 = 2.12</p>

    <p><strong>Step 2: Calculate z-statistic</strong></p>
    <p>z = (72.3 - 67.5)/2.12 = 4.8/2.12 = 2.26</p>

    <p><strong>Step 3: Compare to critical value</strong></p>
    <p>z = 2.26 > 1.96 (critical value for α=.05)</p>
    <p>Therefore, <strong>reject H₀</strong></p>

    <p><strong>Conclusion:</strong> Psychology students score significantly different from the class average (z = 2.26, N = 20, p < .05).</p>
  </div>

  <h3>Assumptions of the Z-Test</h3>

  <div class="warning-box">
    <h4>Three Key Assumptions:</h4>
    <ol>
      <li><strong>Normality:</strong> Population is normally distributed</li>
      <li><strong>Independence:</strong> Observations are independent</li>
      <li><strong>Known σ:</strong> Population SD is known (unrealistic!)</li>
    </ol>
  </div>

  <h3>Why the Z-Test is "Useless"</h3>

  <div class="concept-box" role="note">
    <p>The assumption that we know σ but not μ is absurd. In real research, if we don't know the population mean, we almost certainly don't know the population standard deviation either!</p>
    <p>Solution: Use the <strong>t-test</strong> instead, which estimates σ from the sample.</p>
  </div>

  <h3>Common Pitfalls</h3>
  <ul>
    <li>Using z-test when σ is unknown (use t-test)</li>
    <li>Assuming normality without checking</li>
    <li>Ignoring non-independence</li>
    <li>Confusing standard deviation and standard error</li>
    <li>Using σ̂ (sample SD) instead of σ (population SD)</li>
  </ul>

  <h3>Key Takeaway</h3>
  <div class="concept-box" role="note">
    <p>The z-test is a teaching tool that helps us understand:</p>
    <ul>
      <li>How standardization works</li>
      <li>The logic of hypothesis testing</li>
      <li>Sampling distributions</li>
      <li>Why we need the t-test for real data</li>
    </ul>
  </div>
</section>
    `
  },

  // Topic: One-Sample T-Test
  {
    id: 'one-sample-t-test',
    moduleId: 'module-8',
    chapter: 'chapter-11',
    title: 'One-Sample T-Test',
    description: 'Testing a sample mean when population SD is unknown.',
    icon: 't',
    contentHtml: `
<section class="module-content" aria-labelledby="one-sample-t-title">
  <h2 id="one-sample-t-title">11.2 The One-Sample T-Test</h2>

  <div class="concept-box" role="note">
    <h3>Quick Summary</h3>
    <p>The one-sample t-test compares a sample mean against a hypothesized value when the population standard deviation is unknown. It's one of the most commonly used statistical tests.</p>
  </div>

  <h3>The Problem with the Z-Test</h3>
  <p>The z-test requires knowing the population standard deviation σ, which is unrealistic. What if we don't know σ? We estimate it from our sample data using σ̂.</p>

  <h3>Introducing the T-Test</h3>

  <div class="formula-box">
    <h4>T-Statistic Formula:</h4>
    <p>t = (X̄ - μ) / SE(X̄)</p>
    <p>t = (X̄ - μ) / (σ̂/√N)</p>

    <h4>Where:</h4>
    <ul>
      <li>X̄ = sample mean</li>
      <li>μ = hypothesized population mean</li>
      <li>σ̂ = sample standard deviation (estimated)</li>
      <li>N = sample size</li>
      <li>SE(X̄) = σ̂/√N = estimated standard error</li>
    </ul>
  </div>

  <h3>The T-Distribution</h3>
  <p>When using an estimated standard deviation, the sampling distribution is no longer normal. It follows a <strong>t-distribution</strong> with N-1 degrees of freedom.</p>

  <div class="concept-box" role="note">
    <h4>Key Properties of the T-Distribution:</h4>
    <ul>
      <li>Bell-shaped and symmetric (like normal)</li>
      <li>Heavier tails than normal (more spread out)</li>
      <li>Gets closer to normal as df increases</li>
      <li>Different distribution for each df value</li>
      <li>Accounts for uncertainty in estimating σ</li>
    </ul>
  </div>

  <h3>Degrees of Freedom (df)</h3>

  <div class="formula-box">
    <p><strong>For one-sample t-test:</strong> df = N - 1</p>
    <p>We lose 1 df because we estimate the mean from the data</p>
  </div>

  <h3>Hypothesis Testing Steps</h3>

  <div class="example-box">
    <h4>Step-by-Step Procedure:</h4>
    <ol>
      <li><strong>State hypotheses:</strong>
        <ul>
          <li>H₀: μ = μ₀</li>
          <li>H₁: μ ≠ μ₀ (two-tailed)</li>
        </ul>
      </li>
      <li><strong>Calculate sample statistics:</strong> X̄ and σ̂</li>
      <li><strong>Calculate standard error:</strong> SE = σ̂/√N</li>
      <li><strong>Calculate t-statistic:</strong> t = (X̄ - μ₀)/SE</li>
      <li><strong>Find critical value:</strong> Look up t-critical for df=N-1 and α level</li>
      <li><strong>Make decision:</strong> Reject H₀ if |t| > t-critical</li>
      <li><strong>Report results:</strong> Include t, df, p-value, and conclusion</li>
    </ol>
  </div>

  <h3>Doing the Test in jamovi</h3>

  <div class="software-box">
    <h4>jamovi Procedure:</h4>
    <ol>
      <li>Go to <strong>Analyses → T-Tests → One Sample T-Test</strong></li>
      <li>Move your variable to the <strong>Variables</strong> box</li>
      <li>Enter the hypothesized mean in <strong>Test value</strong></li>
      <li>Under <strong>Hypothesis</strong>, select:
        <ul>
          <li>≠ Test value (two-tailed, default)</li>
          <li>> Test value (one-tailed, upper)</li>
          <li>< Test value (one-tailed, lower)</li>
        </ul>
      </li>
      <li>Under <strong>Additional Statistics</strong>, check:
        <ul>
          <li>Mean difference</li>
          <li>Effect size (Cohen's d)</li>
          <li>Confidence interval</li>
          <li>Descriptives</li>
        </ul>
      </li>
      <li>Under <strong>Assumption Checks</strong>, check:
        <ul>
          <li>Normality (Shapiro-Wilk test)</li>
        </ul>
      </li>
    </ol>
  </div>

  <h3>Worked Example</h3>

  <div class="example-box">
    <h4>Psychology Students' Grades (Realistic Version)</h4>
    <p><strong>Research Question:</strong> Do psychology students score differently from 67.5%?</p>

    <p><strong>Data:</strong></p>
    <ul>
      <li>Sample mean: X̄ = 72.3</li>
      <li>Sample SD: σ̂ = 9.52</li>
      <li>Hypothesized mean: μ₀ = 67.5</li>
      <li>Sample size: N = 20</li>
    </ul>

    <p><strong>Calculations:</strong></p>
    <p>1. Standard error: SE = 9.52/√20 = 2.13</p>
    <p>2. t-statistic: t = (72.3 - 67.5)/2.13 = 2.25</p>
    <p>3. Degrees of freedom: df = 20 - 1 = 19</p>
    <p>4. Critical value (α=.05, two-tailed): t-crit = 2.09</p>
    <p>5. Since |t| = 2.25 > 2.09, reject H₀</p>
    <p>6. p-value = .036</p>

    <p><strong>jamovi Output:</strong></p>
    <ul>
      <li>t(19) = 2.25, p = .036</li>
      <li>Mean difference = 4.80</li>
      <li>95% CI: [0.34, 9.26]</li>
      <li>Cohen's d = 0.50</li>
    </ul>

    <p><strong>Conclusion:</strong> Psychology students scored significantly higher than the hypothesized value of 67.5% (t(19) = 2.25, p = .036, d = 0.50). The mean difference was 4.80 percentage points with a 95% confidence interval from 0.34 to 9.26.</p>
  </div>

  <h3>Interpreting the Results</h3>

  <div class="formula-box">
    <h4>Reporting Format:</h4>
    <p>"With a mean grade of 72.3%, psychology students scored significantly higher than the expected 67.5% (t(19) = 2.25, p = .036, CI₉₅ = [0.34, 9.26], d = 0.50)."</p>
  </div>

  <h3>Assumptions of the One-Sample T-Test</h3>

  <div class="warning-box">
    <h4>Two Key Assumptions:</h4>
    <ol>
      <li><strong>Normality:</strong> Population distribution is normal
        <ul>
          <li>Check with Shapiro-Wilk test</li>
          <li>Robust to violations with N > 30</li>
          <li>Use Wilcoxon test if violated</li>
        </ul>
      </li>
      <li><strong>Independence:</strong> Observations are independent
        <ul>
          <li>Random sampling</li>
          <li>No repeated measures</li>
          <li>Cannot test statistically</li>
          <li>Requires good study design</li>
        </ul>
      </li>
    </ol>
  </div>

  <h3>Common Pitfalls</h3>
  <ul>
    <li>Not checking normality assumption</li>
    <li>Using with severely skewed data</li>
    <li>Confusing one-sample with independent samples test</li>
    <li>Forgetting to report effect size and CI</li>
    <li>Using wrong hypothesized value</li>
    <li>Interpreting p-value as probability H₀ is true</li>
  </ul>

  <h3>When to Use One-Sample T-Test</h3>
  <div class="concept-box" role="note">
    <p><strong>Use when:</strong></p>
    <ul>
      <li>One sample, one measurement per person</li>
      <li>Comparing to a known/hypothesized value</li>
      <li>Population SD unknown</li>
      <li>Data approximately normal</li>
    </ul>
    <p><strong>Don't use when:</strong></p>
    <ul>
      <li>Comparing two groups → independent samples t-test</li>
      <li>Same people measured twice → paired t-test</li>
      <li>Data severely non-normal → Wilcoxon test</li>
      <li>Population SD known → z-test (rare!)</li>
    </ul>
  </div>
</section>
    `
  },

  // Topic: Independent Samples T-Test (Student's)
  {
    id: 'independent-t-test',
    moduleId: 'module-8',
    chapter: 'chapter-11',
    title: 'Independent Samples T-Test (Student)',
    description: 'Comparing means of two independent groups (assumes equal variances).',
    icon: 't2',
    contentHtml: `
<section class="module-content" aria-labelledby="independent-t-title">
  <h2 id="independent-t-title">11.3 The Independent Samples T-Test: Student Test</h2>

  <div class="concept-box" role="note">
    <h3>Quick Summary</h3>
    <p>The independent samples t-test (Student's version) compares the means of two separate groups when the groups have equal population variances. This is one of the most commonly used tests in experimental research.</p>
  </div>

  <h3>When to Use</h3>
  <p>Use this test when:</p>
  <ul>
    <li>You have two separate groups (different participants in each)</li>
    <li>You want to compare their means</li>
    <li>Both groups have equal population variances (homogeneity assumption)</li>
    <li>Both groups are normally distributed</li>
  </ul>

  <div class="example-box">
    <h4>Example Research Question</h4>
    <p>Do students who study with background music (Group 1) score differently on an exam than students who study in silence (Group 2)?</p>
  </div>

  <h3>The Logic</h3>
  <p>We want to test if the difference between two sample means (X̄₁ - X̄₂) is significantly different from zero. If the population means are equal, we'd expect the sample means to be similar (though not identical due to sampling variability).</p>

  <div class="formula-box">
    <h4>Hypotheses:</h4>
    <p><strong>H₀:</strong> μ₁ = μ₂ (population means are equal)</p>
    <p><strong>H₁:</strong> μ₁ ≠ μ₂ (population means differ) [two-tailed]</p>

    <h4>Test Statistic:</h4>
    <p>t = (X̄₁ - X̄₂) / SE(X̄₁ - X̄₂)</p>

    <h4>Standard Error of the Difference:</h4>
    <p>SE(X̄₁ - X̄₂) = σ̂ₚ × √(1/N₁ + 1/N₂)</p>

    <h4>Pooled Standard Deviation:</h4>
    <p>σ̂ₚ = √[(w₁σ̂₁² + w₂σ̂₂²) / (w₁ + w₂)]</p>
    <p>where w₁ = N₁ - 1 and w₂ = N₂ - 1</p>

    <h4>Degrees of Freedom:</h4>
    <p>df = N₁ + N₂ - 2</p>
  </div>

  <h3>Understanding Pooled Standard Deviation</h3>
  <p>Since we assume both groups have the same population variance, we combine (pool) information from both samples to get a better estimate of the shared variance. The pooled SD is a weighted average that gives more weight to the larger sample.</p>

  <div class="example-box">
    <h4>Worked Example</h4>
    <p><strong>Research Question:</strong> Do psychology students and biology students differ in their average exam scores?</p>

    <p><strong>Data:</strong></p>
    <ul>
      <li>Psychology students: N₁ = 15, X̄₁ = 72.3, σ̂₁ = 9.5</li>
      <li>Biology students: N₂ = 15, X̄₂ = 65.8, σ̂₂ = 7.8</li>
    </ul>

    <p><strong>Step 1: Calculate weights</strong></p>
    <p>w₁ = 15 - 1 = 14</p>
    <p>w₂ = 15 - 1 = 14</p>

    <p><strong>Step 2: Calculate pooled SD</strong></p>
    <p>σ̂ₚ = √[(14 × 9.5² + 14 × 7.8²) / (14 + 14)]</p>
    <p>σ̂ₚ = √[(14 × 90.25 + 14 × 60.84) / 28]</p>
    <p>σ̂ₚ = √[2115.26 / 28] = √75.55 = 8.69</p>

    <p><strong>Step 3: Calculate SE</strong></p>
    <p>SE(X̄₁ - X̄₂) = 8.69 × √(1/15 + 1/15)</p>
    <p>SE(X̄₁ - X̄₂) = 8.69 × √(0.1333) = 8.69 × 0.365 = 3.17</p>

    <p><strong>Step 4: Calculate t</strong></p>
    <p>t = (72.3 - 65.8) / 3.17 = 6.5 / 3.17 = 2.05</p>

    <p><strong>Step 5: Compare to critical value</strong></p>
    <p>df = 15 + 15 - 2 = 28</p>
    <p>Critical value (α = .05, two-tailed): t_crit = ±2.048</p>
    <p>Since |2.05| > 2.048, we reject H₀</p>

    <p><strong>Conclusion:</strong> Psychology students scored significantly higher than biology students, t(28) = 2.05, p < .05.</p>
  </div>

  <div class="software-box">
    <h3>Running Student's T-Test in jamovi</h3>
    <ol>
      <li><strong>Analyses → T-Tests → Independent Samples T-Test</strong></li>
      <li><strong>Dependent Variables:</strong> Select your outcome variable (e.g., exam score)</li>
      <li><strong>Grouping Variable:</strong> Select your group variable (e.g., major)</li>
      <li><strong>Tests:</strong> Check "Student's" (default)</li>
      <li><strong>Additional Statistics:</strong>
        <ul>
          <li>Check "Mean difference" for effect</li>
          <li>Check "Effect size" for Cohen's d</li>
          <li>Check "Confidence interval" for 95% CI</li>
          <li>Check "Descriptives" for group statistics</li>
        </ul>
      </li>
      <li><strong>Assumption Checks:</strong>
        <ul>
          <li>Check "Normality" for Shapiro-Wilk test</li>
          <li>Check "Equality of variances" for Levene's test</li>
        </ul>
      </li>
    </ol>

    <h4>Interpreting Output:</h4>
    <p><strong>Independent Samples T-Test Table:</strong></p>
    <ul>
      <li><strong>statistic:</strong> The t-value</li>
      <li><strong>df:</strong> Degrees of freedom</li>
      <li><strong>p:</strong> The p-value (significance)</li>
    </ul>

    <p><strong>Descriptives Table:</strong></p>
    <ul>
      <li>Shows means, SDs, and Ns for each group</li>
    </ul>

    <p><strong>Assumption Check - Levene's Test:</strong></p>
    <ul>
      <li>Tests H₀: variances are equal</li>
      <li>If p > .05: variances are equal (assumption met)</li>
      <li>If p < .05: variances differ (use Welch's test instead)</li>
    </ul>
  </div>

  <h3>Assumptions</h3>
  <div class="warning-box">
    <ol>
      <li><strong>Normality:</strong> Both populations are normally distributed
        <ul>
          <li>Check with Shapiro-Wilk test for each group</li>
          <li>Visual inspection with histograms/QQ plots</li>
          <li>Robust to violations with N > 30 per group (CLT)</li>
        </ul>
      </li>
      <li><strong>Independence:</strong>
        <ul>
          <li>Observations within each group are independent</li>
          <li>Groups are independent of each other</li>
          <li>No participant in both groups</li>
          <li>Random assignment/sampling</li>
        </ul>
      </li>
      <li><strong>Homogeneity of Variance:</strong> σ₁ = σ₂
        <ul>
          <li>Check with Levene's test</li>
          <li>If violated, use Welch's t-test instead</li>
          <li>Rule of thumb: larger SD < 2× smaller SD</li>
        </ul>
      </li>
    </ol>
  </div>

  <h3>Common Pitfalls</h3>
  <ul>
    <li>Using with paired/repeated measures data (use paired t-test instead)</li>
    <li>Ignoring Levene's test results (if significant, use Welch's)</li>
    <li>Not checking normality assumption</li>
    <li>Assuming equal variances without testing</li>
    <li>Forgetting to report effect size</li>
    <li>Not reporting descriptive statistics</li>
    <li>Using with more than 2 groups (use ANOVA instead)</li>
  </ul>

  <h3>Student's vs. Welch's: Which to Use?</h3>
  <div class="concept-box" role="note">
    <p><strong>Use Student's t-test when:</strong></p>
    <ul>
      <li>Levene's test is non-significant (p > .05)</li>
      <li>Sample sizes are equal</li>
      <li>SDs are similar</li>
    </ul>
    <p><strong>Use Welch's t-test when:</strong></p>
    <ul>
      <li>Levene's test is significant (p < .05)</li>
      <li>Sample sizes differ substantially</li>
      <li>SDs differ substantially</li>
      <li>When in doubt (Welch's is safer!)</li>
    </ul>
  </div>

  <h3>Reporting Results</h3>
  <div class="example-box">
    <p><strong>APA Style Example:</strong></p>
    <p>"An independent samples t-test revealed that psychology students (M = 72.3, SD = 9.5) scored significantly higher than biology students (M = 65.8, SD = 7.8), t(28) = 2.05, p = .049, d = 0.75, 95% CI [0.02, 12.98]. This represents a medium-to-large effect size."</p>
  </div>
</section>
    `
  },

  // Topic: Welch's T-Test
  {
    id: 'welch-t-test',
    moduleId: 'module-8',
    chapter: 'chapter-11',
    title: 'Independent Samples T-Test (Welch)',
    description: 'Comparing means of two independent groups (does NOT assume equal variances).',
    icon: 't2',
    contentHtml: `
<section class="module-content" aria-labelledby="welch-t-title">
  <h2 id="welch-t-title">11.4 The Independent Samples T-Test: Welch Test</h2>

  <div class="concept-box" role="note">
    <h3>Quick Summary</h3>
    <p>Welch's t-test is a more robust version of the independent samples t-test that does NOT assume equal population variances. It's generally the safer choice for comparing two independent groups.</p>
  </div>

  <h3>Why Welch's Test?</h3>
  <p>The Student's t-test assumes equal variances (homogeneity). But what if this assumption is violated? Welch's test adjusts for unequal variances, making it more versatile and robust.</p>

  <div class="warning-box">
    <h4>Key Advantage</h4>
    <p>Welch's test gives accurate results whether variances are equal or unequal. Student's test only works well when variances are equal. For this reason, many statisticians recommend using Welch's test by default.</p>
  </div>

  <h3>The Difference from Student's Test</h3>
  <p>The test statistic looks similar:</p>

  <div class="formula-box">
    <h4>Test Statistic:</h4>
    <p>t = (X̄₁ - X̄₂) / SE(X̄₁ - X̄₂)</p>

    <h4>But the SE is calculated differently:</h4>
    <p><strong>Student's SE:</strong> Uses pooled SD (assumes equal variances)</p>
    <p>SE = σ̂ₚ × √(1/N₁ + 1/N₂)</p>

    <p><strong>Welch's SE:</strong> Uses separate variances</p>
    <p>SE(X̄₁ - X̄₂) = √(σ̂₁²/N₁ + σ̂₂²/N₂)</p>

    <h4>Degrees of Freedom:</h4>
    <p>Student's: df = N₁ + N₂ - 2 (simple)</p>
    <p>Welch's: df calculated using complex formula (typically non-integer and smaller)</p>

    <p>Welch's df formula:</p>
    <p>df = (σ̂₁²/N₁ + σ̂₂²/N₂)² / [(σ̂₁²/N₁)²/(N₁-1) + (σ̂₂²/N₂)²/(N₂-1)]</p>
  </div>

  <h3>Understanding the Adjustments</h3>
  <p>Welch's test makes two key adjustments:</p>
  <ol>
    <li><strong>Standard Error:</strong> Uses separate variance estimates instead of pooling them</li>
    <li><strong>Degrees of Freedom:</strong> Adjusts df downward to account for uncertainty from unequal variances</li>
  </ol>

  <div class="example-box">
    <h4>Worked Example</h4>
    <p><strong>Research Question:</strong> Do anxiety scores differ between therapy group and control group?</p>

    <p><strong>Data:</strong></p>
    <ul>
      <li>Therapy group: N₁ = 20, X̄₁ = 32.5, σ̂₁ = 12.8</li>
      <li>Control group: N₂ = 15, X̄₂ = 45.2, σ̂₂ = 6.3</li>
    </ul>

    <p>Note: SDs are very different (12.8 vs 6.3), suggesting unequal variances!</p>

    <p><strong>Step 1: Calculate SE (Welch's method)</strong></p>
    <p>SE = √(12.8²/20 + 6.3²/15)</p>
    <p>SE = √(163.84/20 + 39.69/15)</p>
    <p>SE = √(8.192 + 2.646) = √10.838 = 3.29</p>

    <p><strong>Step 2: Calculate t</strong></p>
    <p>t = (32.5 - 45.2) / 3.29 = -12.7 / 3.29 = -3.86</p>

    <p><strong>Step 3: Calculate df (Welch's method)</strong></p>
    <p>df = (8.192 + 2.646)² / [(8.192²/19) + (2.646²/14)]</p>
    <p>df = 117.46 / (3.533 + 0.500) = 117.46 / 4.033 = 29.1</p>

    <p><strong>Step 4: Compare to critical value</strong></p>
    <p>With df ≈ 29 and α = .05 (two-tailed): t_crit ≈ ±2.045</p>
    <p>Since |-3.86| > 2.045, we reject H₀</p>

    <p><strong>Conclusion:</strong> The therapy group had significantly lower anxiety scores than the control group, t(29.1) = -3.86, p < .001.</p>
  </div>

  <div class="software-box">
    <h3>Running Welch's T-Test in jamovi</h3>
    <ol>
      <li><strong>Analyses → T-Tests → Independent Samples T-Test</strong></li>
      <li><strong>Dependent Variables:</strong> Select your outcome variable</li>
      <li><strong>Grouping Variable:</strong> Select your group variable</li>
      <li><strong>Tests:</strong> Check "Welch's" (in addition to or instead of Student's)</li>
      <li><strong>Additional Statistics:</strong>
        <ul>
          <li>Check "Mean difference"</li>
          <li>Check "Effect size"</li>
          <li>Check "Confidence interval"</li>
          <li>Check "Descriptives"</li>
        </ul>
      </li>
      <li><strong>Assumption Checks:</strong>
        <ul>
          <li>Check "Normality"</li>
          <li>Check "Equality of variances" (to see if Welch's is needed)</li>
        </ul>
      </li>
    </ol>

    <h4>Interpreting Levene's Test:</h4>
    <ul>
      <li>If p > .05: Equal variances (Student's okay, but Welch's still safe)</li>
      <li>If p < .05: Unequal variances (definitely use Welch's!)</li>
    </ul>
  </div>

  <h3>Comparing Student's and Welch's Results</h3>
  <div class="concept-box" role="note">
    <h4>When Variances ARE Equal:</h4>
    <p>Student's and Welch's give very similar results. Student's has slightly more power (higher df), but the difference is minimal.</p>

    <h4>When Variances are NOT Equal:</h4>
    <p>Student's test can give incorrect results (wrong p-values, poor CI coverage). Welch's test remains accurate. This is why Welch's is preferred!</p>

    <h4>Which df is Larger?</h4>
    <p>Student's always uses: N₁ + N₂ - 2</p>
    <p>Welch's uses smaller df when variances differ substantially, making it more conservative (harder to reject H₀).</p>
  </div>

  <h3>Assumptions</h3>
  <div class="warning-box">
    <ol>
      <li><strong>Normality:</strong> Both populations normally distributed
        <ul>
          <li>Check with Shapiro-Wilk for each group</li>
          <li>Welch's is robust to violations with larger samples</li>
        </ul>
      </li>
      <li><strong>Independence:</strong>
        <ul>
          <li>Observations independent within groups</li>
          <li>Groups independent of each other</li>
        </ul>
      </li>
      <li><strong>Homogeneity of Variance:</strong> NOT REQUIRED!
        <ul>
          <li>This is the advantage of Welch's test</li>
          <li>Works whether variances are equal or not</li>
        </ul>
      </li>
    </ol>
  </div>

  <h3>When to Use Student's vs. Welch's</h3>
  <div class="example-box">
    <h4>Decision Guide:</h4>
    <table border="1" cellpadding="5">
      <tr>
        <th>Situation</th>
        <th>Recommendation</th>
      </tr>
      <tr>
        <td>Levene's p > .05 (equal variances)</td>
        <td>Either test works; Student's slightly more powerful</td>
      </tr>
      <tr>
        <td>Levene's p < .05 (unequal variances)</td>
        <td>Use Welch's (Student's may be inaccurate)</td>
      </tr>
      <tr>
        <td>Very different sample sizes</td>
        <td>Use Welch's (safer with unbalanced designs)</td>
      </tr>
      <tr>
        <td>Unsure/default choice</td>
        <td>Use Welch's (works in all situations)</td>
      </tr>
    </table>
  </div>

  <h3>Common Pitfalls</h3>
  <ul>
    <li>Using Student's when Levene's is significant</li>
    <li>Thinking Welch's is only for unequal variances (it's always safe!)</li>
    <li>Rounding Welch's df to nearest integer (report as decimal)</li>
    <li>Not checking assumptions before choosing test</li>
    <li>Forgetting that Welch's doesn't fix non-normality</li>
  </ul>

  <h3>Power Comparison</h3>
  <div class="concept-box" role="note">
    <h4>When Variances Equal:</h4>
    <p>Student's test has slightly more power (higher df means narrower critical region). But the difference is typically negligible.</p>

    <h4>When Variances Unequal:</h4>
    <p>Welch's test maintains proper Type I error rate. Student's test may have inflated Type I error (false positives) or reduced power, depending on which group has larger variance and sample size.</p>

    <h4>Modern Recommendation:</h4>
    <p>Many statisticians now recommend <strong>always using Welch's test</strong> as the default, since it's robust in all situations and the power loss (when variances are equal) is minimal.</p>
  </div>

  <h3>Reporting Results</h3>
  <div class="example-box">
    <p><strong>APA Style Example:</strong></p>
    <p>"A Welch's t-test was conducted to account for unequal variances (Levene's test: p = .03). Results showed that the therapy group (M = 32.5, SD = 12.8) had significantly lower anxiety scores than the control group (M = 45.2, SD = 6.3), t(29.12) = -3.86, p < .001, d = -1.24, 95% CI [-19.42, -6.03]. This represents a large effect."</p>

    <p><strong>Note:</strong> Report Welch's df with decimals (don't round to integer).</p>
  </div>
</section>
    `
  },

  // Topic: Paired-Samples T-Test
  {
    id: 'paired-t-test',
    moduleId: 'module-8',
    chapter: 'chapter-11',
    title: 'Paired-Samples T-Test',
    description: 'Comparing two related measurements (repeated measures or matched pairs).',
    icon: 'repeat',
    contentHtml: `
<section class="module-content" aria-labelledby="paired-t-title">
  <h2 id="paired-t-title">11.5 The Paired-Samples T-Test</h2>

  <div class="concept-box" role="note">
    <h3>Quick Summary</h3>
    <p>The paired-samples t-test (also called dependent samples t-test or repeated measures t-test) compares two measurements from the same participants or from matched pairs. It's more powerful than independent samples tests because it controls for individual differences.</p>
  </div>

  <h3>When to Use Paired-Samples T-Test</h3>
  <p>Use this test when:</p>
  <ul>
    <li><strong>Repeated measures:</strong> Same people measured twice (pre-test/post-test)</li>
    <li><strong>Matched pairs:</strong> Different people matched on key variables (twins, siblings)</li>
    <li><strong>Natural pairs:</strong> Naturally occurring pairs (left/right hand, husband/wife)</li>
  </ul>

  <div class="example-box">
    <h4>Example Research Questions:</h4>
    <ul>
      <li>Do students' scores improve from pre-test to post-test?</li>
      <li>Is reaction time faster in the left hand or right hand?</li>
      <li>Do people rate chocolate cake higher than vanilla cake?</li>
      <li>Does a drug reduce blood pressure compared to baseline?</li>
    </ul>
  </div>

  <h3>The Key Insight: Analyze Difference Scores</h3>
  <p>The paired-samples t-test is essentially a <strong>one-sample t-test on the difference scores</strong>.</p>

  <div class="formula-box">
    <h4>Step 1: Calculate Difference Scores</h4>
    <p>For each participant i:</p>
    <p>Dᵢ = X₁ᵢ - X₂ᵢ</p>
    <p>(measurement 1 minus measurement 2)</p>

    <h4>Step 2: Test if Mean Difference = 0</h4>
    <p>H₀: μ_D = 0 (no average change)</p>
    <p>H₁: μ_D ≠ 0 (there is average change)</p>

    <h4>Test Statistic:</h4>
    <p>t = D̄ / SE(D̄)</p>
    <p>t = D̄ / (σ̂_D / √N)</p>

    <h4>Where:</h4>
    <ul>
      <li>D̄ = mean of difference scores</li>
      <li>σ̂_D = standard deviation of difference scores</li>
      <li>N = number of pairs</li>
      <li>df = N - 1</li>
    </ul>
  </div>

  <h3>Why Paired Tests are More Powerful</h3>
  <p>The paired-samples t-test removes between-subject variability. People differ from each other in baseline levels, but we're interested in <em>change within individuals</em>.</p>

  <div class="concept-box" role="note">
    <h4>Advantage of Pairing:</h4>
    <p>By analyzing each person's change score, we control for individual differences. This reduces error variance and increases statistical power.</p>

    <p><strong>Example:</strong> Some people are naturally faster at reaction time tasks. When comparing pre-post, we don't care about these baseline differences—we care whether <em>each person</em> got faster.</p>
  </div>

  <div class="example-box">
    <h4>Worked Example</h4>
    <p><strong>Research Question:</strong> Does a memory training program improve recall?</p>

    <p><strong>Design:</strong> 10 participants tested before and after training.</p>

    <table border="1" cellpadding="5">
      <tr>
        <th>Participant</th>
        <th>Pre-test (X₁)</th>
        <th>Post-test (X₂)</th>
        <th>Difference (D)</th>
      </tr>
      <tr><td>1</td><td>12</td><td>15</td><td>3</td></tr>
      <tr><td>2</td><td>8</td><td>12</td><td>4</td></tr>
      <tr><td>3</td><td>15</td><td>16</td><td>1</td></tr>
      <tr><td>4</td><td>10</td><td>14</td><td>4</td></tr>
      <tr><td>5</td><td>13</td><td>15</td><td>2</td></tr>
      <tr><td>6</td><td>9</td><td>11</td><td>2</td></tr>
      <tr><td>7</td><td>11</td><td>17</td><td>6</td></tr>
      <tr><td>8</td><td>14</td><td>16</td><td>2</td></tr>
      <tr><td>9</td><td>7</td><td>10</td><td>3</td></tr>
      <tr><td>10</td><td>12</td><td>15</td><td>3</td></tr>
    </table>

    <p><strong>Step 1: Calculate mean difference</strong></p>
    <p>D̄ = (3+4+1+4+2+2+6+2+3+3) / 10 = 30 / 10 = 3.0</p>

    <p><strong>Step 2: Calculate SD of differences</strong></p>
    <p>σ̂_D = 1.49 (calculated from the 10 difference scores)</p>

    <p><strong>Step 3: Calculate SE</strong></p>
    <p>SE(D̄) = 1.49 / √10 = 1.49 / 3.16 = 0.47</p>

    <p><strong>Step 4: Calculate t</strong></p>
    <p>t = 3.0 / 0.47 = 6.38</p>

    <p><strong>Step 5: Compare to critical value</strong></p>
    <p>df = 10 - 1 = 9</p>
    <p>Critical value (α = .05, two-tailed): t_crit = ±2.262</p>
    <p>Since 6.38 > 2.262, we reject H₀</p>

    <p><strong>Conclusion:</strong> Memory scores improved significantly from pre-test (M = 11.1) to post-test (M = 14.1), t(9) = 6.38, p < .001, with an average improvement of 3.0 items.</p>
  </div>

  <div class="software-box">
    <h3>Running Paired-Samples T-Test in jamovi</h3>
    <ol>
      <li><strong>Analyses → T-Tests → Paired Samples T-Test</strong></li>
      <li><strong>Paired Variables:</strong>
        <ul>
          <li>Move both variables into the "Paired Variables" box</li>
          <li>They should appear as a pair (e.g., "Pre-test - Post-test")</li>
        </ul>
      </li>
      <li><strong>Tests:</strong>
        <ul>
          <li>"Student's t" is checked by default</li>
          <li>Can also check "Wilcoxon rank" for nonparametric alternative</li>
        </ul>
      </li>
      <li><strong>Hypothesis:</strong>
        <ul>
          <li>Measure 1 ≠ Measure 2 (two-tailed, default)</li>
          <li>Measure 1 > Measure 2 (one-tailed)</li>
          <li>Measure 1 < Measure 2 (one-tailed)</li>
        </ul>
      </li>
      <li><strong>Additional Statistics:</strong>
        <ul>
          <li>Check "Mean difference" (shows D̄)</li>
          <li>Check "SE difference" (shows SE of difference)</li>
          <li>Check "Effect size" (Cohen's d for differences)</li>
          <li>Check "Confidence interval"</li>
          <li>Check "Descriptives" (means for both measurements)</li>
        </ul>
      </li>
      <li><strong>Assumption Checks:</strong>
        <ul>
          <li>Check "Normality" to test if <em>difference scores</em> are normal</li>
        </ul>
      </li>
    </ol>

    <h4>Interpreting Output:</h4>
    <ul>
      <li><strong>statistic:</strong> The t-value</li>
      <li><strong>df:</strong> N - 1 (number of pairs minus 1)</li>
      <li><strong>p:</strong> Significance level</li>
      <li><strong>Mean difference:</strong> D̄ (average change)</li>
      <li><strong>Effect size:</strong> Cohen's d calculated on difference scores</li>
    </ul>
  </div>

  <h3>Assumptions</h3>
  <div class="warning-box">
    <ol>
      <li><strong>Normality of DIFFERENCE Scores:</strong>
        <ul>
          <li>The <em>difference scores</em> should be normally distributed</li>
          <li>NOT the original measurements themselves</li>
          <li>Check with Shapiro-Wilk test on differences</li>
          <li>If violated, use Wilcoxon signed-rank test</li>
        </ul>
      </li>
      <li><strong>Independence of Pairs:</strong>
        <ul>
          <li>Each pair must be independent of other pairs</li>
          <li>One person's scores don't affect another person's</li>
          <li>Random sampling or assignment</li>
        </ul>
      </li>
      <li><strong>Note:</strong> We do NOT assume independence within pairs!
        <ul>
          <li>The two measurements ARE related (that's the point!)</li>
        </ul>
      </li>
    </ol>
  </div>

  <h3>Common Pitfalls</h3>
  <ul>
    <li><strong>Using independent samples test:</strong> Wastes power! Paired data should use paired test</li>
    <li><strong>Wrong direction:</strong> Pay attention to which measurement is subtracted from which</li>
    <li><strong>Checking normality of original scores:</strong> Must check difference scores!</li>
    <li><strong>Missing data:</strong> If one measurement is missing, entire pair must be excluded</li>
    <li><strong>Unequal sample sizes:</strong> Must have same N for both measurements</li>
    <li><strong>Not reporting effect size:</strong> Always report Cohen's d</li>
  </ul>

  <h3>Effect Size for Paired Tests</h3>
  <div class="formula-box">
    <h4>Cohen's d for Paired Data:</h4>
    <p>d = D̄ / σ̂_D</p>
    <p>(mean difference divided by SD of differences)</p>

    <h4>Interpretation:</h4>
    <ul>
      <li>d ≈ 0.2: Small effect</li>
      <li>d ≈ 0.5: Medium effect</li>
      <li>d ≈ 0.8: Large effect</li>
    </ul>

    <p><strong>Note:</strong> Some programs report d relative to the original scale rather than difference scores. Check your software documentation!</p>
  </div>

  <h3>Paired vs. Independent: Choosing the Right Test</h3>
  <div class="concept-box" role="note">
    <h4>Use Paired-Samples T-Test when:</h4>
    <ul>
      <li>Same participants measured twice</li>
      <li>Matched pairs of different participants</li>
      <li>Natural pairs (twins, couples, left/right)</li>
      <li>You want to control for individual differences</li>
    </ul>

    <h4>Use Independent Samples T-Test when:</h4>
    <ul>
      <li>Two completely separate groups</li>
      <li>Different participants in each group</li>
      <li>Random assignment to conditions</li>
      <li>No matching or pairing</li>
    </ul>

    <h4>Key Question:</h4>
    <p><strong>Is there a meaningful connection between observation 1 in group 1 and observation 1 in group 2?</strong></p>
    <p>If YES → Paired test</p>
    <p>If NO → Independent test</p>
  </div>

  <h3>Reporting Results</h3>
  <div class="example-box">
    <p><strong>APA Style Example:</strong></p>
    <p>"A paired-samples t-test revealed that memory scores improved significantly from pre-test (M = 11.1, SD = 2.6) to post-test (M = 14.1, SD = 2.4), t(9) = 6.38, p < .001, d = 2.02, 95% CI [1.94, 4.06]. This represents a very large effect."</p>

    <p><strong>Alternative phrasing:</strong></p>
    <p>"Participants recalled significantly more items after training (M = 14.1, SD = 2.4) than before training (M = 11.1, SD = 2.6), with an average improvement of 3.0 items (SD = 1.49), t(9) = 6.38, p < .001, d = 2.02."</p>
  </div>

  <h3>Power Advantage of Paired Designs</h3>
  <div class="concept-box" role="note">
    <p><strong>Why is the paired test more powerful?</strong></p>
    <p>It removes between-subject variability from the error term. We're comparing each person to themselves, so individual differences don't contribute to noise.</p>

    <p><strong>Example:</strong> Imagine testing if a drug lowers blood pressure.</p>
    <ul>
      <li><strong>Independent design:</strong> Some people naturally have high BP, others low. This variability makes it harder to detect drug effects.</li>
      <li><strong>Paired design:</strong> Measure each person before and after drug. We only care if <em>their</em> BP changed, not how they compare to others.</li>
    </ul>

    <p>The paired design can have <strong>much greater power</strong> with the same sample size!</p>
  </div>
</section>
    `
  },

  // Topic: One-Sided Tests
  {
    id: 'one-sided-tests',
    moduleId: 'module-8',
    title: 'One-Sided Tests',
    description: 'Directional hypothesis tests (one-tailed tests).',
    icon: 'arrow-right',
    contentHtml: `
<section class="module-content" aria-labelledby="one-sided-title">
  <h2 id="one-sided-title">11.6 One-Sided Tests</h2>

  <div class="concept-box" role="note">
    <h3>Quick Summary</h3>
    <p>One-sided tests (also called one-tailed tests) are used when you have a directional prediction about the relationship you're testing. They test whether an effect exists in a specific direction, rather than just whether an effect exists at all.</p>
  </div>

  <h3>Two-Sided vs. One-Sided Tests</h3>

  <div class="formula-box">
    <h4>Two-Sided Test (Non-Directional):</h4>
    <p>H₀: μ = μ₀</p>
    <p>H₁: μ ≠ μ₀</p>
    <p>Question: "Is there a difference in either direction?"</p>
    <p>Critical region: Both tails (α/2 in each tail)</p>

    <h4>One-Sided Test (Directional):</h4>
    <p><strong>Greater than:</strong></p>
    <p>H₀: μ ≤ μ₀</p>
    <p>H₁: μ > μ₀</p>
    <p>Question: "Is the value greater?"</p>
    <p>Critical region: Upper tail only (α in upper tail)</p>

    <p><strong>Less than:</strong></p>
    <p>H₀: μ ≥ μ₀</p>
    <p>H₁: μ < μ₀</p>
    <p>Question: "Is the value less?"</p>
    <p>Critical region: Lower tail only (α in lower tail)</p>
  </div>

  <h3>When to Use One-Sided Tests</h3>
  <div class="warning-box">
    <h4>CRITICAL RULE: Pre-Specify Direction!</h4>
    <p>You must decide whether to use a one-sided test <strong>BEFORE</strong> collecting or looking at your data. You cannot switch to a one-sided test after seeing results!</p>

    <h4>Valid Reasons for One-Sided Tests:</h4>
    <ul>
      <li>Strong theoretical prediction about direction</li>
      <li>Only one direction is meaningful or interesting</li>
      <li>Previous research consistently shows one direction</li>
      <li>Effect in the other direction is impossible (e.g., can't have negative age)</li>
    </ul>

    <h4>NEVER Use One-Sided Tests:</h4>
    <ul>
      <li>Just to get p < .05 when two-sided test is p = .06</li>
      <li>After seeing which direction the data went</li>
      <li>When effect in either direction would be interesting</li>
      <li>As a default choice</li>
    </ul>
  </div>

  <div class="example-box">
    <h4>Good Example (One-Sided Justified):</h4>
    <p><strong>Research Question:</strong> Does a new drug reduce blood pressure?</p>
    <ul>
      <li>We specifically designed the drug to <em>lower</em> BP</li>
      <li>An increase in BP would be a safety concern, not a research finding</li>
      <li>We only care about testing if it reduces BP</li>
      <li><strong>H₁:</strong> μ_drug < μ_placebo (one-sided test justified)</li>
    </ul>

    <h4>Bad Example (One-Sided NOT Justified):</h4>
    <p><strong>Research Question:</strong> Do men and women differ in math scores?</p>
    <ul>
      <li>Either direction would be an interesting finding</li>
      <li>No strong theory predicting a specific direction</li>
      <li>Using one-sided test here is just p-hacking!</li>
      <li><strong>H₁:</strong> μ_men ≠ μ_women (two-sided test required)</li>
    </ul>
  </div>

  <h3>P-Values: One-Sided vs. Two-Sided</h3>
  <div class="formula-box">
    <h4>Relationship:</h4>
    <p>p_one-sided = p_two-sided / 2</p>
    <p>(If effect is in predicted direction)</p>

    <h4>Examples:</h4>
    <ul>
      <li>Two-sided p = .10 → One-sided p = .05</li>
      <li>Two-sided p = .06 → One-sided p = .03</li>
      <li>Two-sided p = .04 → One-sided p = .02</li>
    </ul>

    <h4>Important:</h4>
    <p>If effect is in the <em>wrong</em> direction (opposite to prediction), the one-sided p-value is > .50, and you fail to reject H₀.</p>
  </div>

  <h3>Critical Values and Regions</h3>
  <div class="concept-box" role="note">
    <h4>For α = .05:</h4>
    <p><strong>Two-sided test:</strong></p>
    <ul>
      <li>Critical values: ±1.96 (for z) or ±2.0 (approximately, for t)</li>
      <li>Reject H₀ if |t| > 2.0</li>
      <li>Critical region: 2.5% in each tail</li>
    </ul>

    <p><strong>One-sided test (upper tail):</strong></p>
    <ul>
      <li>Critical value: +1.64 (for z) or ≈1.7 (for t)</li>
      <li>Reject H₀ if t > 1.7</li>
      <li>Critical region: 5% in upper tail only</li>
    </ul>

    <p><strong>One-sided test (lower tail):</strong></p>
    <ul>
      <li>Critical value: -1.64 (for z) or ≈-1.7 (for t)</li>
      <li>Reject H₀ if t < -1.7</li>
      <li>Critical region: 5% in lower tail only</li>
    </ul>
  </div>

  <div class="example-box">
    <h4>Worked Example: Two-Sided Test</h4>
    <p><strong>Question:</strong> Do students score differently from the national average of 75?</p>
    <p><strong>Data:</strong> N = 25, X̄ = 78, σ̂ = 10</p>
    <p><strong>Test:</strong> Two-sided</p>

    <p>t = (78 - 75) / (10/√25) = 3 / 2 = 1.5</p>
    <p>df = 24, critical value = ±2.064</p>
    <p>Since |1.5| < 2.064, fail to reject H₀</p>
    <p>Two-sided p ≈ .15</p>
    <p><strong>Conclusion:</strong> No significant difference, p = .15</p>
  </div>

  <div class="example-box">
    <h4>Worked Example: One-Sided Test</h4>
    <p><strong>Question:</strong> Do students score <em>higher</em> than the national average of 75?</p>
    <p>(Same data: N = 25, X̄ = 78, σ̂ = 10)</p>
    <p><strong>Test:</strong> One-sided (upper tail)</p>
    <p><strong>H₁:</strong> μ > 75</p>

    <p>t = 1.5 (same calculation)</p>
    <p>df = 24, critical value = +1.711 (one-sided)</p>
    <p>Since 1.5 < 1.711, fail to reject H₀</p>
    <p>One-sided p ≈ .075</p>
    <p><strong>Conclusion:</strong> Not significantly higher, p = .075</p>

    <p><strong>Note:</strong> Even with the "advantage" of a one-sided test, still not significant!</p>
  </div>

  <div class="software-box">
    <h3>Running One-Sided Tests in jamovi</h3>
    <p>All t-tests in jamovi have a "Hypothesis" option:</p>

    <h4>One-Sample T-Test:</h4>
    <ol>
      <li>Analyses → T-Tests → One Sample T-Test</li>
      <li>Under "Hypothesis" dropdown:
        <ul>
          <li>≠ Test value (two-sided, default)</li>
          <li>> Test value (one-sided: μ > μ₀)</li>
          <li>< Test value (one-sided: μ < μ₀)</li>
        </ul>
      </li>
    </ol>

    <h4>Independent Samples T-Test:</h4>
    <ol>
      <li>Analyses → T-Tests → Independent Samples T-Test</li>
      <li>Under "Hypothesis" dropdown:
        <ul>
          <li>Group 1 ≠ Group 2 (two-sided, default)</li>
          <li>Group 1 > Group 2 (one-sided)</li>
          <li>Group 1 < Group 2 (one-sided)</li>
        </ul>
      </li>
    </ol>

    <h4>Paired Samples T-Test:</h4>
    <ol>
      <li>Analyses → T-Tests → Paired Samples T-Test</li>
      <li>Under "Hypothesis" dropdown:
        <ul>
          <li>Measure 1 ≠ Measure 2 (two-sided, default)</li>
          <li>Measure 1 > Measure 2 (one-sided)</li>
          <li>Measure 1 < Measure 2 (one-sided)</li>
        </ul>
      </li>
    </ol>
  </div>

  <h3>Advantages and Disadvantages</h3>
  <div class="concept-box" role="note">
    <h4>Advantages of One-Sided Tests:</h4>
    <ul>
      <li>More power to detect effect in predicted direction</li>
      <li>Smaller p-value if effect is in right direction</li>
      <li>More focused research question</li>
      <li>Can be justified with strong theory</li>
    </ul>

    <h4>Disadvantages of One-Sided Tests:</h4>
    <ul>
      <li>Cannot detect effects in opposite direction</li>
      <li>Easy to misuse (p-hacking)</li>
      <li>Often viewed skeptically by reviewers</li>
      <li>Requires pre-registration to be credible</li>
      <li>Less informative than two-sided tests</li>
    </ul>
  </div>

  <h3>Common Misconceptions</h3>
  <div class="warning-box">
    <h4>WRONG: "I can use one-sided because I predicted a direction"</h4>
    <p>Having a prediction is necessary but not sufficient. The direction must be the <em>only</em> interesting outcome.</p>

    <h4>WRONG: "My two-sided p = .08, so I'll report one-sided p = .04"</h4>
    <p>This is p-hacking and scientific misconduct! The choice must be made before analyzing data.</p>

    <h4>WRONG: "One-sided tests are always more powerful"</h4>
    <p>They're only more powerful for effects in the predicted direction. If the effect goes the opposite way, one-sided tests have zero power!</p>

    <h4>WRONG: "One-sided p-values are half of two-sided p-values"</h4>
    <p>Only true if the effect is in the predicted direction! If it's in the opposite direction, the one-sided p-value is > .50.</p>
  </div>

  <h3>Best Practices</h3>
  <div class="concept-box" role="note">
    <ol>
      <li><strong>Default to two-sided tests</strong> unless you have strong justification</li>
      <li><strong>Pre-register your analysis plan</strong> if using one-sided tests</li>
      <li><strong>Justify your choice</strong> in the methods section</li>
      <li><strong>Never switch</strong> after seeing the data</li>
      <li><strong>Be conservative:</strong> When in doubt, use two-sided</li>
      <li><strong>Consider reviewers:</strong> Two-sided tests are less controversial</li>
    </ol>
  </div>

  <h3>Reporting Results</h3>
  <div class="example-box">
    <h4>Two-Sided Test (Standard):</h4>
    <p>"An independent samples t-test revealed that Group A (M = 72.5, SD = 8.3) scored significantly higher than Group B (M = 68.2, SD = 7.9), t(38) = 2.15, p = .038, d = 0.68, 95% CI [0.21, 8.42]."</p>

    <h4>One-Sided Test (Must Justify):</h4>
    <p>"Based on prior research showing consistent benefits of the intervention, we conducted a one-sided test. Results confirmed that the treatment group (M = 72.5, SD = 8.3) scored significantly higher than the control group (M = 68.2, SD = 7.9), t(38) = 2.15, p = .019 (one-tailed), d = 0.68."</p>

    <p><strong>Note:</strong> Always state that p-value is one-tailed!</p>
  </div>

  <h3>Decision Guide</h3>
  <div class="concept-box" role="note">
    <h4>Use Two-Sided Test (default) if:</h4>
    <ul>
      <li>Effect in either direction would be interesting</li>
      <li>Exploratory research</li>
      <li>Replication study</li>
      <li>Unsure about direction</li>
      <li>Want to be conservative</li>
    </ul>

    <h4>Use One-Sided Test only if:</h4>
    <ul>
      <li>Strong theoretical prediction of direction</li>
      <li>Effect in opposite direction is impossible or meaningless</li>
      <li>Confirmed in pre-registered analysis plan</li>
      <li>Can defend choice to skeptical reviewers</li>
    </ul>

    <p><strong>When in doubt, use two-sided!</strong></p>
  </div>
</section>
    `
  },

  // Topic: Effect Size - Cohen's d
  {
    id: 'effect-size-cohens-d',
    moduleId: 'module-8',
    title: "Effect Size: Cohen's d",
    description: 'Measuring the practical magnitude of differences between means.',
    icon: 'ruler',
    contentHtml: `
<section class="module-content" aria-labelledby="cohens-d-title">
  <h2 id="cohens-d-title">11.7 Effect Size: Cohen's d</h2>

  <div class="concept-box" role="note">
    <h3>Quick Summary</h3>
    <p>Cohen's d is a standardized measure of effect size that expresses the difference between means in standard deviation units. Unlike p-values, effect sizes are independent of sample size and provide information about practical significance.</p>
  </div>

  <h3>Why Effect Sizes Matter</h3>
  <p>P-values tell us if an effect exists, but not how big it is. Effect sizes answer the crucial question: <strong>"How big is the difference?"</strong></p>

  <div class="warning-box">
    <h4>The Problem with P-Values Alone:</h4>
    <ul>
      <li>Large sample → even tiny effects become "significant"</li>
      <li>Small sample → even huge effects may not be "significant"</li>
      <li>p-value depends on sample size, effect size does not</li>
      <li>Statistical significance ≠ practical significance</li>
    </ul>

    <h4>Solution: Always Report Effect Sizes!</h4>
    <p>Effect sizes tell you the magnitude of the difference, independent of sample size.</p>
  </div>

  <h3>What is Cohen's d?</h3>
  <p>Cohen's d expresses the mean difference in standard deviation units. It answers: "How many standard deviations apart are the means?"</p>

  <div class="formula-box">
    <h4>General Formula:</h4>
    <p>d = (Mean Difference) / (Standard Deviation)</p>

    <h4>For One-Sample T-Test:</h4>
    <p>d = (X̄ - μ₀) / σ̂</p>

    <h4>For Independent Samples T-Test:</h4>
    <p>d = (X̄₁ - X̄₂) / σ̂ₚ</p>
    <p>where σ̂ₚ is the pooled standard deviation</p>

    <h4>For Paired-Samples T-Test:</h4>
    <p>d = D̄ / σ̂_D</p>
    <p>where D̄ = mean difference and σ̂_D = SD of differences</p>
  </div>

  <h3>Interpreting Cohen's d</h3>
  <div class="concept-box" role="note">
    <h4>Cohen's Guidelines (Rough Guide Only!):</h4>
    <ul>
      <li><strong>d ≈ 0.2:</strong> Small effect</li>
      <li><strong>d ≈ 0.5:</strong> Medium effect</li>
      <li><strong>d ≈ 0.8:</strong> Large effect</li>
    </ul>

    <h4>Important Caveats:</h4>
    <ul>
      <li>These are rough guidelines, not rigid rules</li>
      <li>What counts as "large" depends on context</li>
      <li>In some fields, d = 0.2 is considered important</li>
      <li>In others, even d = 0.8 might not be practically meaningful</li>
      <li>Always interpret in context of your research area!</li>
    </ul>
  </div>

  <div class="example-box">
    <h4>Intuitive Understanding:</h4>
    <p><strong>d = 0.5</strong> means the means are half a standard deviation apart.</p>

    <p>Imagine two normal distributions:</p>
    <ul>
      <li>Group 1: M = 100, SD = 15</li>
      <li>Group 2: M = 107.5, SD = 15</li>
      <li>Difference = 7.5</li>
      <li>d = 7.5 / 15 = 0.5</li>
    </ul>

    <p>This means if you picked a random person from Group 2, they'd score 0.5 SDs above the Group 1 mean.</p>
  </div>

  <div class="example-box">
    <h4>Worked Example 1: One-Sample</h4>
    <p><strong>Question:</strong> Do psychology students' exam scores differ from the national mean of 75?</p>
    <p><strong>Data:</strong> N = 30, X̄ = 78.5, σ̂ = 10</p>

    <p><strong>Step 1: Calculate t-test</strong></p>
    <p>t = (78.5 - 75) / (10/√30) = 3.5 / 1.83 = 1.91</p>
    <p>Result: p = .066 (not significant at α = .05)</p>

    <p><strong>Step 2: Calculate Cohen's d</strong></p>
    <p>d = (78.5 - 75) / 10 = 3.5 / 10 = 0.35</p>

    <p><strong>Interpretation:</strong></p>
    <p>Although not statistically significant (p = .066), there's a small-to-medium effect (d = 0.35). Psychology students score about 1/3 of a standard deviation above the national mean.</p>

    <p><strong>Lesson:</strong> With a larger sample, this effect might reach significance. The effect exists (d = 0.35), but we lack power to detect it reliably.</p>
  </div>

  <div class="example-box">
    <h4>Worked Example 2: Independent Samples</h4>
    <p><strong>Question:</strong> Do males and females differ in reaction time?</p>
    <p><strong>Data:</strong></p>
    <ul>
      <li>Males: N₁ = 200, X̄₁ = 252 ms, σ̂₁ = 45 ms</li>
      <li>Females: N₂ = 200, X̄₂ = 248 ms, σ̂₂ = 42 ms</li>
    </ul>

    <p><strong>Step 1: Calculate pooled SD</strong></p>
    <p>σ̂ₚ ≈ √[(45² + 42²)/2] ≈ 43.5 ms</p>

    <p><strong>Step 2: Calculate t-test</strong></p>
    <p>SE = 43.5 × √(1/200 + 1/200) = 4.35</p>
    <p>t = (252 - 248) / 4.35 = 0.92</p>
    <p>Result: p = .36 (not significant)</p>

    <p><strong>Step 3: Calculate Cohen's d</strong></p>
    <p>d = (252 - 248) / 43.5 = 4 / 43.5 = 0.09</p>

    <p><strong>Interpretation:</strong></p>
    <p>With a very large sample (N = 400), we had excellent power, yet found no significant difference (p = .36). The effect size is tiny (d = 0.09), indicating the difference is negligible—only 4 ms out of ~250 ms reaction time.</p>

    <p><strong>Lesson:</strong> Large samples detect even tiny effects. Here, the tiny effect failed to reach significance because it's genuinely trivial. Even if it were significant, d = 0.09 suggests no practical importance.</p>
  </div>

  <div class="example-box">
    <h4>Worked Example 3: Paired Samples</h4>
    <p><strong>Question:</strong> Does meditation reduce anxiety?</p>
    <p><strong>Data:</strong> N = 15 participants, pre-post design</p>
    <ul>
      <li>Pre-meditation: M = 42.3, SD = 8.2</li>
      <li>Post-meditation: M = 36.7, SD = 7.8</li>
      <li>Difference scores: D̄ = 5.6, σ̂_D = 4.1</li>
    </ul>

    <p><strong>Step 1: Calculate t-test</strong></p>
    <p>t = 5.6 / (4.1/√15) = 5.6 / 1.06 = 5.28</p>
    <p>Result: p < .001 (highly significant)</p>

    <p><strong>Step 2: Calculate Cohen's d</strong></p>
    <p>d = 5.6 / 4.1 = 1.37</p>

    <p><strong>Interpretation:</strong></p>
    <p>The meditation program significantly reduced anxiety, t(14) = 5.28, p < .001, d = 1.37. The effect size is very large (d = 1.37), indicating participants' anxiety decreased by more than one standard deviation. This represents a substantial, clinically meaningful improvement.</p>

    <p><strong>Lesson:</strong> Both statistical significance (p < .001) and practical significance (d = 1.37) converge, providing strong evidence for the intervention's effectiveness.</p>
  </div>

  <div class="software-box">
    <h3>Getting Cohen's d in jamovi</h3>
    <p>jamovi automatically calculates effect sizes when you check the appropriate option:</p>

    <h4>One-Sample T-Test:</h4>
    <ol>
      <li>Analyses → T-Tests → One Sample T-Test</li>
      <li>Check "Effect size" under Additional Statistics</li>
      <li>jamovi reports Cohen's d</li>
    </ol>

    <h4>Independent Samples T-Test:</h4>
    <ol>
      <li>Analyses → T-Tests → Independent Samples T-Test</li>
      <li>Check "Effect size" under Additional Statistics</li>
      <li>jamovi reports Cohen's d (based on pooled SD)</li>
    </ol>

    <h4>Paired Samples T-Test:</h4>
    <ol>
      <li>Analyses → T-Tests → Paired Samples T-Test</li>
      <li>Check "Effect size" under Additional Statistics</li>
      <li>jamovi reports Cohen's d (based on SD of differences)</li>
    </ol>

    <p><strong>Note:</strong> jamovi may also show "Hedges' g", which is a bias-corrected version of Cohen's d. For large samples, d and g are nearly identical.</p>
  </div>

  <h3>Cohen's d vs. Other Effect Sizes</h3>
  <div class="concept-box" role="note">
    <h4>Related Effect Size Measures:</h4>
    <ul>
      <li><strong>Hedges' g:</strong> Bias-corrected version of d (better for small samples)</li>
      <li><strong>Glass's Δ:</strong> Uses control group SD instead of pooled SD</li>
      <li><strong>r (correlation):</strong> Related to d; can convert between them</li>
      <li><strong>η² (eta-squared):</strong> Proportion of variance explained</li>
    </ul>

    <h4>Relationship between d and r:</h4>
    <p>r = d / √(d² + 4)</p>
    <p>d = 2r / √(1 - r²)</p>

    <h4>Example Conversions:</h4>
    <ul>
      <li>d = 0.2 ≈ r = .10 (1% variance explained)</li>
      <li>d = 0.5 ≈ r = .24 (6% variance explained)</li>
      <li>d = 0.8 ≈ r = .37 (14% variance explained)</li>
      <li>d = 1.0 ≈ r = .45 (20% variance explained)</li>
    </ul>
  </div>

  <h3>Common Pitfalls</h3>
  <ul>
    <li><strong>Ignoring effect sizes:</strong> Always report them! P-values alone are insufficient</li>
    <li><strong>Rigid interpretation:</strong> Don't treat Cohen's guidelines as absolute thresholds</li>
    <li><strong>Wrong SD:</strong> Make sure you're using the right SD for your design</li>
    <li><strong>Forgetting negative signs:</strong> d can be negative (indicates direction)</li>
    <li><strong>Assuming d = 0.2 is "unimportant":</strong> Context matters!</li>
    <li><strong>Confusing d with r:</strong> They're related but different</li>
  </ul>

  <h3>Contextual Interpretation</h3>
  <div class="warning-box">
    <h4>Cohen's Guidelines are ROUGH:</h4>
    <p>What counts as "large" varies dramatically by field:</p>

    <ul>
      <li><strong>Personality psychology:</strong> d = 0.2 might be typical</li>
      <li><strong>Clinical psychology:</strong> d = 0.5 might be good for therapy</li>
      <li><strong>Educational interventions:</strong> d = 0.4 might be excellent</li>
      <li><strong>Experimental psychology:</strong> d = 0.8+ might be common</li>
    </ul>

    <p><strong>Ask:</strong> How large are typical effects in my research area?</p>
  </div>

  <h3>Sample Size and Effect Size</h3>
  <div class="concept-box" role="note">
    <h4>Key Insight:</h4>
    <p>Effect size (d) is independent of sample size (N), but detection of the effect depends on both:</p>

    <ul>
      <li><strong>Large effect, small N:</strong> Might not reach significance (low power)</li>
      <li><strong>Small effect, large N:</strong> Will likely reach significance (high power)</li>
      <li><strong>Large effect, large N:</strong> Definitely significant</li>
      <li><strong>Small effect, small N:</strong> Definitely not significant</li>
    </ul>

    <h4>Power Analysis:</h4>
    <p>To detect d = 0.5 with 80% power at α = .05 (independent samples):</p>
    <ul>
      <li>Need N ≈ 64 per group (128 total)</li>
    </ul>

    <p>To detect d = 0.2 with 80% power:</p>
    <ul>
      <li>Need N ≈ 394 per group (788 total)</li>
    </ul>
  </div>

  <h3>Reporting Effect Sizes</h3>
  <div class="example-box">
    <h4>APA Style Examples:</h4>
    <p><strong>Basic reporting:</strong></p>
    <p>"The treatment group (M = 78.3, SD = 9.2) scored significantly higher than the control group (M = 72.1, SD = 8.7), t(58) = 2.78, p = .007, d = 0.72."</p>

    <p><strong>With interpretation:</strong></p>
    <p>"...t(58) = 2.78, p = .007, d = 0.72. This represents a medium-to-large effect, with the treatment group scoring nearly three-quarters of a standard deviation above the control group."</p>

    <p><strong>With confidence interval:</strong></p>
    <p>"...t(58) = 2.78, p = .007, d = 0.72, 95% CI [0.19, 1.24]."</p>
  </div>

  <h3>Effect Sizes and Practical Significance</h3>
  <div class="concept-box" role="note">
    <h4>Statistical Significance ≠ Practical Significance</h4>

    <p><strong>Scenario 1: Significant but trivial</strong></p>
    <p>N = 10,000, d = 0.05, p < .001</p>
    <p>→ Statistically significant, but effect is tiny and likely meaningless</p>

    <p><strong>Scenario 2: Not significant but important</strong></p>
    <p>N = 15, d = 0.6, p = .08</p>
    <p>→ Not significant, but medium effect suggests something real (need more data)</p>

    <p><strong>Scenario 3: The ideal</strong></p>
    <p>N = 80, d = 0.7, p = .001</p>
    <p>→ Significant AND substantial effect size</p>

    <h4>Always Report Both!</h4>
    <p>P-values + Effect sizes give a complete picture.</p>
  </div>
</section>
    `
  },

  // Topic: Checking Normality
  {
    id: 'checking-normality',
    moduleId: 'module-8',
    title: 'Checking Normality',
    description: 'Testing the normality assumption using QQ plots and Shapiro-Wilk test.',
    icon: 'chart-bell',
    contentHtml: `
<section class="module-content" aria-labelledby="normality-title">
  <h2 id="normality-title">11.8 Checking Normality</h2>

  <div class="concept-box" role="note">
    <h3>Quick Summary</h3>
    <p>Most t-tests assume that data are normally distributed. This section covers how to check this assumption using visual (QQ plots) and statistical (Shapiro-Wilk test) methods.</p>
  </div>

  <h3>Why Check Normality?</h3>
  <p>The t-test assumes that the population from which your sample is drawn is normally distributed. When this assumption is violated, the p-values and confidence intervals may be inaccurate.</p>

  <div class="warning-box">
    <h4>When Does Normality Matter?</h4>
    <ul>
      <li><strong>Small samples (N < 30):</strong> Normality assumption is important</li>
      <li><strong>Large samples (N > 30):</strong> t-test is robust due to Central Limit Theorem</li>
      <li><strong>Severe violations:</strong> Can affect results even with large samples</li>
      <li><strong>Outliers:</strong> Can have substantial impact regardless of sample size</li>
    </ul>
  </div>

  <h3>Two Methods for Checking Normality</h3>
  <ol>
    <li><strong>Visual inspection:</strong> QQ plots (Quantile-Quantile plots)</li>
    <li><strong>Statistical test:</strong> Shapiro-Wilk test</li>
  </ol>

  <h3>Method 1: QQ Plots (Quantile-Quantile Plots)</h3>
  <div class="concept-box" role="note">
    <h4>What is a QQ Plot?</h4>
    <p>A QQ plot compares your data's quantiles to the quantiles of a theoretical normal distribution. If your data are normally distributed, the points should fall roughly on a straight diagonal line.</p>

    <h4>How to Read a QQ Plot:</h4>
    <ul>
      <li><strong>Straight line:</strong> Data are approximately normal ✓</li>
      <li><strong>Curved upward (right):</strong> Positive skew (long right tail)</li>
      <li><strong>Curved downward (left):</strong> Negative skew (long left tail)</li>
      <li><strong>S-shaped:</strong> Heavy tails (high kurtosis) or light tails (low kurtosis)</li>
      <li><strong>Few points off line:</strong> Outliers</li>
    </ul>
  </div>

  <div class="example-box">
    <h4>Interpreting QQ Plot Patterns</h4>
    <p><strong>Pattern 1: Approximately Normal</strong></p>
    <p>Points fall close to diagonal line → Normality assumption met</p>
    <p>Minor deviations are okay, especially at the extremes</p>

    <p><strong>Pattern 2: Positive Skew</strong></p>
    <p>Points curve upward on right side → Long right tail</p>
    <p>Example: Income data, reaction times</p>
    <p>Solution: Consider log transformation or nonparametric test</p>

    <p><strong>Pattern 3: Negative Skew</strong></p>
    <p>Points curve downward on left side → Long left tail</p>
    <p>Example: Test scores with ceiling effect</p>
    <p>Solution: Reflect and transform, or use nonparametric test</p>

    <p><strong>Pattern 4: Heavy Tails (High Kurtosis)</strong></p>
    <p>S-shaped curve (steep middle, flatter ends) → More extreme values than normal</p>
    <p>Example: Financial returns, outlier-prone data</p>
    <p>Solution: Check for outliers, consider robust methods</p>

    <p><strong>Pattern 5: Light Tails (Low Kurtosis)</strong></p>
    <p>Reverse S-shape → Fewer extreme values than normal</p>
    <p>Example: Truncated or bounded data</p>
    <p>Less common in practice</p>
  </div>

  <h3>Method 2: Shapiro-Wilk Test</h3>
  <div class="formula-box">
    <h4>Hypotheses:</h4>
    <p>H₀: Data are normally distributed</p>
    <p>H₁: Data are not normally distributed</p>

    <h4>Test Statistic: W</h4>
    <ul>
      <li>Ranges from 0 to 1</li>
      <li>W = 1: Perfect normality</li>
      <li>W < 1: Departure from normality</li>
      <li>Smaller W → Greater departure</li>
    </ul>

    <h4>Interpretation:</h4>
    <ul>
      <li><strong>p > .05:</strong> Fail to reject H₀ → Data consistent with normality ✓</li>
      <li><strong>p < .05:</strong> Reject H₀ → Data significantly non-normal ✗</li>
    </ul>
  </div>

  <div class="warning-box">
    <h4>Important Caveats about Shapiro-Wilk:</h4>
    <ul>
      <li><strong>Sensitive to sample size:</strong>
        <ul>
          <li>Small samples: Hard to detect non-normality (low power)</li>
          <li>Large samples: Detects even trivial deviations (overpowered)</li>
        </ul>
      </li>
      <li><strong>Don't rely solely on p-value:</strong> Use in combination with visual inspection</li>
      <li><strong>Remember:</strong> We're testing H₀ that data ARE normal (opposite of usual tests)</li>
    </ul>
  </div>

  <div class="example-box">
    <h4>Example 1: Normal Data</h4>
    <p><strong>Data:</strong> N = 50, W = 0.98, p = .62</p>
    <p><strong>Interpretation:</strong></p>
    <ul>
      <li>W = 0.98 is close to 1 (good)</li>
      <li>p = .62 > .05 (fail to reject H₀)</li>
      <li>Conclusion: Data consistent with normality</li>
      <li>Proceed with t-test ✓</li>
    </ul>
  </div>

  <div class="example-box">
    <h4>Example 2: Non-Normal Data (Small Sample)</h4>
    <p><strong>Data:</strong> N = 15, W = 0.87, p = .04</p>
    <p><strong>Interpretation:</strong></p>
    <ul>
      <li>W = 0.87 shows departure from normality</li>
      <li>p = .04 < .05 (reject H₀)</li>
      <li>Conclusion: Data significantly non-normal</li>
      <li>With small N, this is concerning</li>
      <li>Consider nonparametric test (Wilcoxon) ✓</li>
    </ul>
  </div>

  <div class="example-box">
    <h4>Example 3: Large Sample with Minor Deviation</h4>
    <p><strong>Data:</strong> N = 200, W = 0.98, p = .02</p>
    <p><strong>Interpretation:</strong></p>
    <ul>
      <li>W = 0.98 is very close to 1</li>
      <li>p = .02 < .05 (technically significant)</li>
      <li>But: Large sample makes test overly sensitive</li>
      <li>Check QQ plot: If nearly straight, normality assumption okay</li>
      <li>Conclusion: t-test likely robust with N = 200 ✓</li>
    </ul>
  </div>

  <div class="software-box">
    <h3>Checking Normality in jamovi</h3>

    <h4>For One-Sample T-Test:</h4>
    <ol>
      <li>Analyses → T-Tests → One Sample T-Test</li>
      <li>Under "Assumption Checks", check "Normality"</li>
      <li>jamovi will show Shapiro-Wilk test for your variable</li>
    </ol>

    <h4>For Independent Samples T-Test:</h4>
    <ol>
      <li>Analyses → T-Tests → Independent Samples T-Test</li>
      <li>Under "Assumption Checks", check "Normality"</li>
      <li>jamovi will show Shapiro-Wilk for EACH group separately</li>
      <li><strong>Important:</strong> Check normality for both groups!</li>
    </ol>

    <h4>For Paired Samples T-Test:</h4>
    <ol>
      <li>Analyses → T-Tests → Paired Samples T-Test</li>
      <li>Under "Assumption Checks", check "Normality"</li>
      <li>jamovi tests normality of the <strong>difference scores</strong></li>
      <li><strong>Critical:</strong> Test DIFFERENCES, not original variables!</li>
    </ol>

    <h4>Creating QQ Plots in jamovi:</h4>
    <p><strong>Note:</strong> QQ plots are not currently available directly in jamovi's t-test module. To create QQ plots:</p>
    <ol>
      <li>Analyses → Exploration → Descriptives</li>
      <li>Move your variable(s) to Variables box</li>
      <li>Under "Plots", check "Q-Q"</li>
      <li>jamovi will display a Q-Q plot for each variable</li>
    </ol>

    <p><strong>For paired data:</strong> You must first create a difference variable, then make a QQ plot of that difference.</p>
  </div>

  <h3>What to Do When Normality is Violated</h3>
  <div class="concept-box" role="note">
    <h4>Option 1: Use Nonparametric Tests</h4>
    <ul>
      <li><strong>Instead of one-sample t-test:</strong> Wilcoxon signed-rank test</li>
      <li><strong>Instead of independent t-test:</strong> Mann-Whitney U test</li>
      <li><strong>Instead of paired t-test:</strong> Wilcoxon signed-rank test</li>
    </ul>

    <h4>Option 2: Transform the Data</h4>
    <ul>
      <li><strong>Log transformation:</strong> For positive skew</li>
      <li><strong>Square root transformation:</strong> For moderate positive skew</li>
      <li><strong>Reciprocal transformation:</strong> For extreme positive skew</li>
      <li><strong>Note:</strong> Transform, then re-check normality</li>
    </ul>

    <h4>Option 3: Rely on Robustness (Large Samples)</h4>
    <ul>
      <li>With N > 30 per group, t-test is fairly robust</li>
      <li>Central Limit Theorem ensures sampling distribution is approximately normal</li>
      <li>Exception: Severe skew or extreme outliers still problematic</li>
    </ul>

    <h4>Option 4: Remove Outliers (Cautiously!)</h4>
    <ul>
      <li>Only if you have good reason (data entry error, equipment malfunction)</li>
      <li>NEVER remove outliers just to get significance!</li>
      <li>Always report removed data</li>
    </ul>
  </div>

  <h3>Decision Guide</h3>
  <div class="example-box">
    <h4>Step-by-Step Decision Process:</h4>
    <ol>
      <li><strong>Check sample size:</strong>
        <ul>
          <li>N < 15: Normality very important</li>
          <li>15 ≤ N < 30: Normality important</li>
          <li>N ≥ 30: t-test more robust</li>
          <li>N ≥ 100: t-test very robust</li>
        </ul>
      </li>
      <li><strong>Run Shapiro-Wilk test</strong></li>
      <li><strong>Examine QQ plot</strong></li>
      <li><strong>Decide:</strong>
        <ul>
          <li>Shapiro-Wilk p > .05 AND QQ plot straight → Proceed with t-test ✓</li>
          <li>Shapiro-Wilk p < .05 AND small N (< 30) → Use nonparametric test</li>
          <li>Shapiro-Wilk p < .05 BUT large N (> 100) AND QQ plot nearly straight → t-test probably okay</li>
          <li>Severe skew or outliers → Transform or use nonparametric test</li>
        </ul>
      </li>
    </ol>
  </div>

  <h3>Common Pitfalls</h3>
  <ul>
    <li>Relying solely on Shapiro-Wilk without visual inspection</li>
    <li>Ignoring normality assumption in small samples</li>
    <li>Testing normality of original variables in paired design (should test differences!)</li>
    <li>Removing outliers without justification</li>
    <li>Assuming all data must be perfectly normal</li>
    <li>Not checking each group separately in independent samples</li>
    <li>Forgetting that large samples make t-test robust</li>
  </ul>

  <h3>Reporting Normality Checks</h3>
  <div class="example-box">
    <h4>Example 1: Assumption Met</h4>
    <p>"Shapiro-Wilk tests indicated that data were normally distributed in both groups (Group A: W = 0.97, p = .52; Group B: W = 0.96, p = .31). Visual inspection of Q-Q plots confirmed approximate normality."</p>

    <h4>Example 2: Assumption Violated, Used Nonparametric</h4>
    <p>"Shapiro-Wilk tests revealed significant departures from normality in both groups (Group A: W = 0.85, p = .01; Group B: W = 0.88, p = .03). Q-Q plots showed positive skew. Due to the violation of the normality assumption and small sample size (N = 20 per group), we conducted a Mann-Whitney U test instead of an independent samples t-test."</p>

    <h4>Example 3: Assumption Violated, But Robust</h4>
    <p>"Although Shapiro-Wilk tests indicated slight departures from normality (both p < .05), the large sample size (N = 150 per group) and visual inspection of Q-Q plots showing only minor deviations suggested the t-test would be robust to these violations."</p>
  </div>

  <h3>Understanding "Approximately Normal"</h3>
  <div class="concept-box" role="note">
    <h4>Key Points:</h4>
    <ul>
      <li>Real data are NEVER perfectly normal</li>
      <li>"Approximately normal" is good enough</li>
      <li>Minor bumps and wiggles in QQ plot are okay</li>
      <li>Focus on major departures: severe skew, heavy tails, outliers</li>
      <li>Use judgment: statistics + visual inspection + sample size</li>
    </ul>

    <h4>When in Doubt:</h4>
    <p>If unsure whether normality assumption is met, consider running both parametric (t-test) and nonparametric (Wilcoxon/Mann-Whitney) tests. If conclusions are the same, normality violation likely not a major concern.</p>
  </div>
</section>
    `
  },

  // Topic: Wilcoxon Tests
  {
    id: 'wilcoxon-tests',
    moduleId: 'module-8',
    title: 'Wilcoxon Tests (Nonparametric)',
    description: 'Nonparametric alternatives to t-tests when normality is violated.',
    icon: 'rank',
    contentHtml: `
<section class="module-content" aria-labelledby="wilcoxon-title">
  <h2 id="wilcoxon-title">11.9 Wilcoxon Tests</h2>

  <div class="concept-box" role="note">
    <h3>Quick Summary</h3>
    <p>Wilcoxon tests are nonparametric alternatives to t-tests that don't require the normality assumption. They work by analyzing ranks instead of raw scores, making them robust to outliers and non-normal distributions.</p>
  </div>

  <h3>When to Use Nonparametric Tests</h3>
  <p>Consider nonparametric tests when:</p>
  <ul>
    <li>Data are severely non-normal (failed Shapiro-Wilk test)</li>
    <li>Small sample size (N < 30) with clear skew or outliers</li>
    <li>Data are ordinal rather than interval/ratio</li>
    <li>Presence of extreme outliers</li>
    <li>You want a robust method that makes fewer assumptions</li>
  </ul>

  <div class="warning-box">
    <h4>Trade-off: Robustness vs. Power</h4>
    <p><strong>Advantages of nonparametric tests:</strong></p>
    <ul>
      <li>Don't assume normality</li>
      <li>Robust to outliers</li>
      <li>Work with ordinal data</li>
      <li>Fewer assumptions</li>
    </ul>

    <p><strong>Disadvantages:</strong></p>
    <ul>
      <li>Typically less powerful than t-tests (if normality holds)</li>
      <li>Test distributions, not means specifically</li>
      <li>Effect sizes less intuitive</li>
      <li>Confidence intervals more complex</li>
    </ul>
  </div>

  <h3>Two Main Wilcoxon Tests</h3>
  <ol>
    <li><strong>Mann-Whitney U test:</strong> Alternative to independent samples t-test</li>
    <li><strong>Wilcoxon signed-rank test:</strong> Alternative to one-sample or paired t-test</li>
  </ol>

  <h3>Test 1: Mann-Whitney U Test</h3>
  <div class="concept-box" role="note">
    <h4>Purpose:</h4>
    <p>Compares the distributions of two independent groups without assuming normality.</p>

    <h4>Alternative to:</h4>
    <p>Independent samples t-test</p>

    <h4>What it tests:</h4>
    <p>H₀: The two groups have the same distribution</p>
    <p>H₁: The two groups have different distributions</p>

    <h4>How it works:</h4>
    <ol>
      <li>Combine all observations from both groups</li>
      <li>Rank all observations from smallest to largest</li>
      <li>Sum ranks for each group separately</li>
      <li>Compare rank sums to what's expected if groups are equal</li>
    </ol>
  </div>

  <div class="formula-box">
    <h4>Test Statistic: U (or W)</h4>
    <p>U represents the number of times observations from Group 1 precede observations from Group 2 in rankings.</p>

    <p><strong>For Group 1:</strong></p>
    <p>U₁ = N₁N₂ + [N₁(N₁+1)/2] - R₁</p>

    <p><strong>For Group 2:</strong></p>
    <p>U₂ = N₁N₂ + [N₂(N₂+1)/2] - R₂</p>

    <p>Where:</p>
    <ul>
      <li>N₁, N₂ = sample sizes</li>
      <li>R₁, R₂ = sum of ranks for each group</li>
    </ul>

    <p><strong>U = min(U₁, U₂)</strong></p>
    <p>(Some software reports W = rank sum directly)</p>
  </div>

  <div class="example-box">
    <h4>Worked Example: Mann-Whitney U</h4>
    <p><strong>Research Question:</strong> Do anxiety scores differ between therapy and control groups?</p>

    <p><strong>Data:</strong></p>
    <ul>
      <li>Therapy: 12, 15, 18, 20, 22 (N₁ = 5)</li>
      <li>Control: 25, 28, 30, 35, 40 (N₂ = 5)</li>
    </ul>

    <p><strong>Step 1: Combine and rank all scores</strong></p>
    <table border="1" cellpadding="5">
      <tr>
        <th>Score</th>
        <th>Rank</th>
        <th>Group</th>
      </tr>
      <tr><td>12</td><td>1</td><td>Therapy</td></tr>
      <tr><td>15</td><td>2</td><td>Therapy</td></tr>
      <tr><td>18</td><td>3</td><td>Therapy</td></tr>
      <tr><td>20</td><td>4</td><td>Therapy</td></tr>
      <tr><td>22</td><td>5</td><td>Therapy</td></tr>
      <tr><td>25</td><td>6</td><td>Control</td></tr>
      <tr><td>28</td><td>7</td><td>Control</td></tr>
      <tr><td>30</td><td>8</td><td>Control</td></tr>
      <tr><td>35</td><td>9</td><td>Control</td></tr>
      <tr><td>40</td><td>10</td><td>Control</td></tr>
    </table>

    <p><strong>Step 2: Sum ranks</strong></p>
    <p>R₁ (Therapy) = 1+2+3+4+5 = 15</p>
    <p>R₂ (Control) = 6+7+8+9+10 = 40</p>

    <p><strong>Step 3: Calculate U</strong></p>
    <p>U₁ = (5×5) + [5×6/2] - 15 = 25 + 15 - 15 = 25</p>
    <p>U₂ = (5×5) + [5×6/2] - 40 = 25 + 15 - 40 = 0</p>
    <p>U = min(25, 0) = 0</p>

    <p><strong>Step 4: Interpret</strong></p>
    <p>U = 0 is the most extreme value possible (no overlap in rankings)</p>
    <p>p < .01 (exact p-value from tables or software)</p>

    <p><strong>Conclusion:</strong> The therapy group had significantly lower anxiety scores than the control group, U = 0, p < .01.</p>
  </div>

  <h3>Test 2: Wilcoxon Signed-Rank Test</h3>
  <div class="concept-box" role="note">
    <h4>Purpose:</h4>
    <p>Compares paired observations or tests if a single sample differs from a hypothesized value, without assuming normality.</p>

    <h4>Alternative to:</h4>
    <ul>
      <li>One-sample t-test</li>
      <li>Paired samples t-test</li>
    </ul>

    <h4>What it tests:</h4>
    <p>H₀: Median difference = 0</p>
    <p>H₁: Median difference ≠ 0</p>

    <h4>How it works:</h4>
    <ol>
      <li>Calculate difference score for each pair</li>
      <li>Rank the absolute values of differences (ignore sign)</li>
      <li>Assign back the original signs to the ranks</li>
      <li>Sum positive ranks and negative ranks separately</li>
      <li>Compare to expected distribution under H₀</li>
    </ol>
  </div>

  <div class="formula-box">
    <h4>Test Statistic: W</h4>
    <p>W = smaller of (sum of positive ranks, sum of negative ranks)</p>

    <p><strong>Alternative formulation:</strong></p>
    <p>Some software reports W as sum of positive ranks only</p>

    <p><strong>Note:</strong> Ties (difference = 0) are excluded from analysis</p>
  </div>

  <div class="example-box">
    <h4>Worked Example: Wilcoxon Signed-Rank</h4>
    <p><strong>Research Question:</strong> Does meditation reduce stress? (Pre-post design)</p>

    <p><strong>Data:</strong></p>
    <table border="1" cellpadding="5">
      <tr>
        <th>Participant</th>
        <th>Pre</th>
        <th>Post</th>
        <th>Diff (Pre-Post)</th>
        <th>|Diff|</th>
        <th>Rank</th>
        <th>Signed Rank</th>
      </tr>
      <tr><td>1</td><td>25</td><td>20</td><td>5</td><td>5</td><td>4</td><td>+4</td></tr>
      <tr><td>2</td><td>30</td><td>28</td><td>2</td><td>2</td><td>1.5</td><td>+1.5</td></tr>
      <tr><td>3</td><td>22</td><td>18</td><td>4</td><td>4</td><td>3</td><td>+3</td></tr>
      <tr><td>4</td><td>28</td><td>26</td><td>2</td><td>2</td><td>1.5</td><td>+1.5</td></tr>
      <tr><td>5</td><td>35</td><td>28</td><td>7</td><td>7</td><td>5</td><td>+5</td></tr>
      <tr><td>6</td><td>20</td><td>23</td><td>-3</td><td>3</td><td>2</td><td>-2</td></tr>
    </table>

    <p><strong>Step 1: Rank absolute differences</strong></p>
    <p>Ranks: 1.5, 1.5, 2, 3, 4, 5 (tied values get average rank)</p>

    <p><strong>Step 2: Sum positive and negative ranks</strong></p>
    <p>Sum of positive ranks: 4 + 1.5 + 3 + 1.5 + 5 = 15</p>
    <p>Sum of negative ranks: 2</p>

    <p><strong>Step 3: Test statistic</strong></p>
    <p>W = min(15, 2) = 2</p>

    <p><strong>Step 4: Interpret</strong></p>
    <p>With N = 6, critical value ≈ 2 (α = .05)</p>
    <p>Since W = 2 ≤ critical value, reject H₀</p>
    <p>p = .046</p>

    <p><strong>Conclusion:</strong> Stress scores significantly decreased from pre (M = 26.7) to post (M = 23.8), Wilcoxon W = 2, p = .046.</p>
  </div>

  <div class="software-box">
    <h3>Running Wilcoxon Tests in jamovi</h3>

    <h4>Mann-Whitney U Test:</h4>
    <ol>
      <li><strong>Analyses → T-Tests → Independent Samples T-Test</strong></li>
      <li>Set up dependent and grouping variables as usual</li>
      <li>Under "Tests", check <strong>"Mann-Whitney U"</strong></li>
      <li>jamovi will run both Student's t-test and Mann-Whitney side-by-side</li>
      <li>Output shows:
        <ul>
          <li><strong>U:</strong> Mann-Whitney U statistic</li>
          <li><strong>W:</strong> Wilcoxon rank-sum (equivalent to U)</li>
          <li><strong>p:</strong> Significance level</li>
        </ul>
      </li>
    </ol>

    <h4>Wilcoxon Signed-Rank Test:</h4>
    <ol>
      <li><strong>Analyses → T-Tests → Paired Samples T-Test</strong></li>
      <li>Set up paired variables as usual</li>
      <li>Under "Tests", check <strong>"Wilcoxon rank"</strong></li>
      <li>jamovi will run both paired t-test and Wilcoxon side-by-side</li>
      <li>Output shows:
        <ul>
          <li><strong>W:</strong> Wilcoxon signed-rank statistic</li>
          <li><strong>p:</strong> Significance level</li>
        </ul>
      </li>
    </ol>

    <p><strong>Note:</strong> jamovi doesn't have a built-in one-sample Wilcoxon signed-rank test, but you can create a difference variable (score - hypothesized value) and test if its median = 0 using the paired test.</p>
  </div>

  <h3>Interpreting Results: Parametric vs. Nonparametric</h3>
  <div class="concept-box" role="note">
    <h4>When Results Agree:</h4>
    <p>If both t-test and Wilcoxon test reach the same conclusion (both significant or both non-significant), the normality violation likely doesn't matter much. Report whichever is more appropriate.</p>

    <h4>When Results Disagree:</h4>
    <ul>
      <li><strong>t-test significant, Wilcoxon not:</strong> May indicate outliers driving t-test result. Trust Wilcoxon.</li>
      <li><strong>Wilcoxon significant, t-test not:</strong> Less common. May indicate skewed distribution where medians differ but means don't. Trust Wilcoxon.</li>
    </ul>

    <h4>General Guidance:</h4>
    <p>If normality is violated (especially with small N), trust the nonparametric test.</p>
  </div>

  <h3>Effect Sizes for Wilcoxon Tests</h3>
  <div class="formula-box">
    <h4>Rank-Biserial Correlation (r_rb):</h4>
    <p>For Mann-Whitney:</p>
    <p>r_rb = 1 - (2U) / (N₁N₂)</p>
    <p>Ranges from -1 to +1 (similar to correlation)</p>

    <h4>r (Point-Biserial):</h4>
    <p>Can also calculate from z-score:</p>
    <p>r = z / √N</p>

    <h4>Interpretation:</h4>
    <ul>
      <li>r ≈ .10: Small effect</li>
      <li>r ≈ .30: Medium effect</li>
      <li>r ≈ .50: Large effect</li>
    </ul>

    <p><strong>Note:</strong> jamovi may not automatically report these; you may need to calculate manually or use additional packages.</p>
  </div>

  <h3>Assumptions of Wilcoxon Tests</h3>
  <div class="warning-box">
    <h4>Mann-Whitney U:</h4>
    <ol>
      <li><strong>Independence:</strong> Observations within and between groups are independent</li>
      <li><strong>Ordinal or continuous data:</strong> Can rank the observations</li>
      <li><strong>Similar shapes:</strong> For testing medians, distributions should have similar shapes (only location differs)</li>
    </ol>

    <h4>Wilcoxon Signed-Rank:</h4>
    <ol>
      <li><strong>Independence:</strong> Pairs are independent of each other</li>
      <li><strong>Ordinal or continuous data:</strong> Differences can be ranked</li>
      <li><strong>Symmetric differences:</strong> Distribution of differences should be approximately symmetric</li>
    </ol>

    <p><strong>Note:</strong> These tests do NOT assume normality—that's their advantage!</p>
  </div>

  <h3>Common Pitfalls</h3>
  <ul>
    <li>Using Wilcoxon when normality holds (loses power unnecessarily)</li>
    <li>Assuming Wilcoxon tests means (they test distributions/medians)</li>
    <li>Not reporting descriptive statistics (medians, ranges)</li>
    <li>Forgetting to exclude tied values (difference = 0) in signed-rank test</li>
    <li>Using Mann-Whitney for paired data (use signed-rank instead)</li>
    <li>Not checking independence assumption</li>
    <li>Reporting means instead of medians for nonparametric results</li>
  </ul>

  <h3>Reporting Wilcoxon Tests</h3>
  <div class="example-box">
    <h4>Mann-Whitney U Example:</h4>
    <p>"Due to violations of normality (Shapiro-Wilk p < .05), a Mann-Whitney U test was conducted. Results showed that the therapy group (Mdn = 20) had significantly lower anxiety scores than the control group (Mdn = 28), U = 45, p = .03, r = .38."</p>

    <p><strong>Note:</strong> Report medians (Mdn), not means, for nonparametric tests!</p>
  </div>

  <div class="example-box">
    <h4>Wilcoxon Signed-Rank Example:</h4>
    <p>"A Wilcoxon signed-rank test revealed that stress scores decreased significantly from pre-test (Mdn = 26.5) to post-test (Mdn = 23.0), W = 2, p = .046."</p>
  </div>

  <h3>Decision Guide: Parametric vs. Nonparametric</h3>
  <div class="concept-box" role="note">
    <h4>Use T-Test (Parametric) when:</h4>
    <ul>
      <li>Data approximately normal (Shapiro-Wilk p > .05)</li>
      <li>Large sample (N > 30) and only minor non-normality</li>
      <li>Data are interval/ratio scale</li>
      <li>You want to maximize power</li>
    </ul>

    <h4>Use Wilcoxon Test (Nonparametric) when:</h4>
    <ul>
      <li>Data significantly non-normal (Shapiro-Wilk p < .05)</li>
      <li>Small sample (N < 30) with clear skew</li>
      <li>Data are ordinal</li>
      <li>Presence of extreme outliers</li>
      <li>You want a robust test with fewer assumptions</li>
    </ul>
  </div>

  <h3>Comparing Test Types</h3>
  <div class="example-box">
    <table border="1" cellpadding="5">
      <tr>
        <th>Design</th>
        <th>Parametric Test</th>
        <th>Nonparametric Alternative</th>
      </tr>
      <tr>
        <td>One sample</td>
        <td>One-sample t-test</td>
        <td>Wilcoxon signed-rank</td>
      </tr>
      <tr>
        <td>Two independent groups</td>
        <td>Independent t-test</td>
        <td>Mann-Whitney U</td>
      </tr>
      <tr>
        <td>Two paired groups</td>
        <td>Paired t-test</td>
        <td>Wilcoxon signed-rank</td>
      </tr>
      <tr>
        <td>>2 independent groups</td>
        <td>One-way ANOVA</td>
        <td>Kruskal-Wallis</td>
      </tr>
      <tr>
        <td>>2 paired groups</td>
        <td>Repeated measures ANOVA</td>
        <td>Friedman test</td>
      </tr>
    </table>
  </div>
</section>
    `
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
