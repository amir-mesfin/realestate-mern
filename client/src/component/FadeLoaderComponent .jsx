import React from 'react';
import { FadeLoader } from 'react-spinners';

const FadeLoaderComponent = ({
  size = 26,
  color = '#3b82f6',
  loading = true,
  speedMultiplier = 1,
  margin = 4,
  height = 15,
  width = 5,
  radius = 7
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 mx-auto mt-[300px]">
      <FadeLoader
        color={color}
        loading={loading}
        cssOverride={{
          margin: `${margin}px`,
        }}
        height={height}
        width={width}
        radius={radius}
        speedMultiplier={speedMultiplier}
        aria-label="Loading Spinner"
        data-testid="fade-loader"
      />
      {loading && <p className="text-sm text-gray-500 font-medium mt-2">Loading...</p>}
    </div>
  );
};

export default FadeLoaderComponent;
