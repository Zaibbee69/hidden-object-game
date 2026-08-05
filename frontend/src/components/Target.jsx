export default function Target() {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
      <div className="stats shadow text-center">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar avatar-online">
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" />
              </div>
            </div>
          </div>
          <div className="stat-value">Waldo</div>
          <div className="stat-title">Not Found</div>
          <div className="stat-desc text-secondary">Catch me if you can</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar avatar-offline">
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" />
              </div>
            </div>
          </div>
          <div className="stat-value">Wizard</div>
          <div className="stat-title">Found</div>
          <div className="stat-desc text-secondary">Kept You Waiting Huh</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar avatar-online">
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" />
              </div>
            </div>
          </div>
          <div className="stat-value">Boss</div>
          <div className="stat-title">Not Found</div>
          <div className="stat-desc text-secondary">Bruh</div>
        </div>
      </div>
    </div>
  );
}
