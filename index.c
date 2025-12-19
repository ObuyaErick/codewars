#include <stdio.h>

int countResponseTimeRegressions(int responseTimes_count, int *responseTimes)
{
    int count;
    for (int i = 0; i < responseTimes_count; i++)
    {
        int sum;
        for (int j = 0; j < i; j++)
        {
            sum += responseTimes[j];
        }
        int prev_average = sum / i;
        if (responseTimes[i] > prev_average)
        {
            count++;
        }
    }
    return count;
}

int main(int argc, char const *argv[])
{
    int* arr = [100, 200, 150, 300];
    printf("Count: %d", countResponseTimeRegressions(4, arr));
    return 0;
}
