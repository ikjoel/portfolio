namespace Chuvor.Client;

/// <summary>
/// Turns the last few delay measurements to the company computer into a plain-words grade, so a user (and support) can tell at a glance
/// whether "slow" or "hanging" comes from the connection and not from the program. A null sample means the answer never came back.
/// What delay feels like: up to 50 ms is hard to tell from sitting at the computer, up to 100 ms is comfortable, up to 200 ms is usable
/// but the typing and clicking lag is noticeable, above that it feels slow. Lost answers (packet loss) cause the freezes.
/// </summary>
public static class ConnectionQuality
{
    public static string Grade(IReadOnlyList<int?> samples, out int avgMs, out int lossPercent)
    {
        avgMs = 0; lossPercent = 0;
        if (samples.Count == 0) return "unknown";
        var ok = samples.Where(x => x.HasValue).Select(x => x!.Value).ToList();
        lossPercent = (samples.Count - ok.Count) * 100 / samples.Count;
        if (ok.Count == 0) return "silent";
        avgMs = (int)Math.Round(ok.Average());
        var jitter = ok.Max() - ok.Min();
        var g = avgMs <= 50 ? 0 : avgMs <= 100 ? 1 : avgMs <= 200 ? 2 : 3;     // 0 excellent .. 3 poor
        if (jitter > 150) g = Math.Max(g, 2);                                    // delay that jumps around feels bad even when the average is fine
        // only 8 measurements are kept, so one lost message is already 12%: a single hiccup is "Fair" at worst; "Poor" needs several lost
        if (lossPercent > 25) g = 3; else if (lossPercent > 0) g = Math.Max(g, 2);
        return new[] { "Excellent", "Good", "Fair", "Poor" }[g];
    }

    public static string Describe(IReadOnlyList<int?> samples)
    {
        var grade = Grade(samples, out var avg, out var loss);
        switch (grade)
        {
            case "unknown": return "";
            case "silent": return "Connection quality: cannot measure (the company computer does not answer a test message).";
        }
        var text = $"Connection quality: {grade}, {avg} ms delay" + (loss > 0 ? $", {loss}% of test messages lost" : "") + ".";
        if (grade == "Fair") text += " It may feel a little slow. A cable instead of Wi-Fi, or moving closer to the router, usually helps.";
        if (grade == "Poor") text += " It will feel slow or freeze. Try a cable instead of Wi-Fi; if it stays poor tell your administrator.";
        return text;
    }
}
